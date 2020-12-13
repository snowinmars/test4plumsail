using System;
using System.Transactions;
using Microsoft.Extensions.Logging;

namespace Plum.Services
{
    internal abstract class BaseService
    {
        protected BaseService(ILogger<BaseService> logger)
        {
            Logger = logger;
        }

        protected TransactionScope NewTransactionScope =>
            new TransactionScope(TransactionScopeOption.Required, // default
                                 new TransactionOptions
                                 {
                                     Timeout =
                                         TimeSpan
                                             .FromSeconds(20), // if we have a transaction longer then 20 sec, we are doing something wrong
                                     IsolationLevel = IsolationLevel.ReadCommitted,
                                 },
                                 TransactionScopeAsyncFlowOption.Enabled); // allow async

        protected readonly ILogger<BaseService> Logger;
    }
}