using System.Data;
using Microsoft.Extensions.Logging;
using Plum.Providers.Helpers;

namespace Plum.Providers
{
    internal abstract class BaseProvider
    {
        protected BaseProvider(ILogger<BaseProvider> logger,
            IDbConnection connection,
            IDapperBuilder dapperBuilder)
        {
            Logger = logger;
            Connection = connection;
            DapperBuilder = dapperBuilder;
        }

        protected readonly IDbConnection Connection;

        protected readonly IDapperBuilder DapperBuilder;

        protected ILogger<BaseProvider> Logger;
    }
}
