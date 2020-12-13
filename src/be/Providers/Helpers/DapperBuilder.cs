using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Logging;
using Plum.Providers.DbEntities;

namespace Plum.Providers.Helpers
{
    internal class DapperBuilder : IDapperBuilderExecuteStage
    {
        public DapperBuilder(IDbConnection connection,
            ILogger<BaseProvider> logger)
        {
            this.connection = connection;
            this.logger = logger;
            dynamicParameters = new DynamicParameters();
        }

        private readonly IDbConnection connection;

        private readonly DynamicParameters dynamicParameters;

        private readonly ILogger<BaseProvider> logger;

        private CommandType commandType;

        private string sql;

        public IDapperBuilderSetupStage Call(IDbConnection connection)
        {
            return new DapperBuilder(connection, logger);
        }

        public async Task<bool> ExecuteAsync()
        {
            var affectedRows = await connection.ExecuteAsync(sql, dynamicParameters, null, null, commandType);

            return affectedRows != 0;
        }

        public async Task<T[]> ExecuteManyAsync<T>()
            where T : DbItem
        {
            var result = await connection.QueryAsync<T>(sql, dynamicParameters, null, null, commandType);

            return result.ToArray();
        }

        public async Task<T> ExecuteOneAsync<T>()
            where T : DbItem
        {
            var result = await ExecuteManyAsync<T>();

            return result?.FirstOrDefault();
        }

        public async Task<T> ExecuteScalarAsync<T>()
        {
            var affectedRows =
                await connection.ExecuteScalarAsync<T>(sql, dynamicParameters, null, null, commandType);

            return affectedRows;
        }

        public IDapperBuilderExecuteStage Procedure(string procedureName)
        {
            sql = procedureName;
            commandType = CommandType.StoredProcedure;

            return this;
        }

        public IDapperBuilderExecuteStage WithIndexParameters(params object[] parameters)
        {
            for (var i = 0; i < parameters.Length; i++)
            {
                var parameter = parameters[i];

                dynamicParameters.Add($"@{i}", parameter);
            }

            return this;
        }

        public IDapperBuilderExecuteStage WithParameter(string parameterName,
            object value,
            DbType? dbType = null,
            ParameterDirection? parameterDirection = null,
            int? size = null)
        {
            dynamicParameters.Add(parameterName.ToLowerInvariant(), value, dbType, parameterDirection, size);

            return this;
        }
    }
}