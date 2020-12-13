using System.Data;
using System.Threading.Tasks;
using Plum.Providers.DbEntities;

namespace Plum.Providers.Helpers
{
    internal interface IDapperBuilder
    {
        IDapperBuilderSetupStage Call(IDbConnection connection);
    }

    internal interface IDapperBuilderSetupStage : IDapperBuilder
    {
        IDapperBuilderExecuteStage Procedure(string procedureName);

        IDapperBuilderExecuteStage WithIndexParameters(params object[] parameters);

        IDapperBuilderExecuteStage WithParameter(string parameterName,
            object value,
            DbType? dbType = null,
            ParameterDirection? parameterDirection = null,
            int? size = null);
    }

    internal interface IDapperBuilderExecuteStage : IDapperBuilderSetupStage
    {
        Task<bool> ExecuteAsync();

        Task<T[]> ExecuteManyAsync<T>() where T : DbItem;

        Task<T> ExecuteOneAsync<T>() where T : DbItem;

        /// <summary>
        /// Returns first column of first row
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        Task<T> ExecuteScalarAsync<T>();
    }
}