using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Plum.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                       .ConfigureWebHostDefaults(builder =>
                       {
                           builder.UseStartup<Startup>()
                                  .UseKestrel()
                                  .ConfigureAppConfiguration(x => x.AddEnvironmentVariables())
                                  .UseUrls("http://0.0.0.0:5002")
                                  .ConfigureLogging(x =>
                                  {
                                      x.ClearProviders();
                                      x.AddConsole();
                                      x.AddFile("_logs/backend.log");
                                  })
                                  .UseContentRoot(Directory.GetCurrentDirectory());
                       });
        }
    }
}
