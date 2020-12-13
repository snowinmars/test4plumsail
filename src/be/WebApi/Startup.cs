using System;
using System.Data;
using System.Reflection;
using Dapper;
using Dapper.NodaTime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Converters;
using Npgsql;
using Plum.Providers;
using Plum.Providers.Abstractions;
using Plum.Providers.Helpers;
using Plum.Services;
using Plum.Services.Abstractions;

namespace Plum.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private const string CustomCorsPolicy = "custom_cors_policy";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHealthChecks();

            services.AddMvc()
                    .ConfigureApplicationPartManager(x =>
                                                         x.FeatureProviders
                                                          .Add(new InternalControllerFeatureProvider()))
                    .AddApplicationPart(Assembly.Load("Plum.Controllers"))
                    .AddControllersAsServices()
                    .AddNewtonsoftJson(x => { x.SerializerSettings.Converters.Add(new StringEnumConverter()); });

            AddSqlContext(services);

            services.AddSingleton<IDapperBuilder, DapperBuilder>();
            services.AddTransient<IDogService, DogService>();
            services.AddTransient<IDogProvider, DogProvider>();

            services.AddCors(options =>
            {
                options.AddPolicy(CustomCorsPolicy,
                                  x =>
                                  {
                                      x.AllowAnyHeader()
                                       .AllowAnyMethod()
                                       .AllowAnyOrigin();
                                  });
            });
        }

        private string ReadEnvironmentVariable(string key)
        {
            var item = Configuration.GetValue(key, "");

            if (string.IsNullOrWhiteSpace(item))
            {
                throw new ArgumentException($"'{key}' env var is not set properly, current value is {item}");
            }

            return item;
        }

        private void AddSqlContext(IServiceCollection services)
        {
            var host = ReadEnvironmentVariable("PSQL_HOST");
            var port = ReadEnvironmentVariable("PSQL_PORT");
            var name = ReadEnvironmentVariable("PSQL_DATABASE_NAME");
            var user = ReadEnvironmentVariable("PSQL_USER");

            var connectionString = $"Host={host};Database={name};Port={port};Username={user}";

            // NpgsqlConnection.GlobalTypeMapper.UseNodaTime();
            DapperNodaTimeSetup.Register();
            SqlMapper.AddTypeHandler(new UriTypeHandler());

            var connection = new NpgsqlConnection(connectionString);
            connection.Open(); // an exception could happens in this line too

            if (connection.State != ConnectionState.Open)
            {
                throw new InvalidOperationException($"Can't connect to database using {connectionString}");
            }

            connection.Close();

            services.AddTransient<IDbConnection>(sp => new NpgsqlConnection(connectionString));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(CustomCorsPolicy);

            app.UseRouting()
               .UseEndpoints(endpoints =>
               {
                   endpoints.MapControllers();
                   endpoints.MapHealthChecks("/health");
               });
        }
    }
}
