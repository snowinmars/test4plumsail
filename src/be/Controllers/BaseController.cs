using Microsoft.Extensions.Logging;

namespace Plum.Controllers
{
    internal class BaseController
    {
        protected readonly ILogger<BaseController> Logger;

        public BaseController(ILogger<BaseController> logger)
        {
            Logger = logger;
        }

        public class Result<T>
        {
            public bool IsSucceed { get; set; }

            public bool IsFailed => !IsSucceed;

            public T Data { get; set; }
        }

        protected Result<T> Success<T>(T data)
        {
            return new Result<T>
            {
                Data = data,
                IsSucceed = true,
            };
        }

        protected Result<T> Failure<T>(T data)
        {
            return new Result<T>
            {
                Data = data,
                IsSucceed = false,
            };
        }
    }
}
