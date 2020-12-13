using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Plum.Controllers
{
    internal abstract class BaseController : ControllerBase
    {
        protected BaseController(ILogger<BaseController> logger)
        {
            Logger = logger;
        }

        public class Result<T>
        {
            public bool IsSucceed { get; set; }

            public bool IsFailed => !IsSucceed;

            public T Data { get; set; }
        }

        public class ResultList<T> : Result<T>
        {
            public long Count { get; set; }
        }

        protected readonly ILogger<BaseController> Logger;

        protected Result<T> Failure<T>(T data)
        {
            return new Result<T>
            {
                Data = data,
                IsSucceed = false,
            };
        }

        protected ResultList<T> Success<T>(T data, long count)
        {
            return new ResultList<T>
            {
                Data = data,
                Count = count,
                IsSucceed = true,
            };
        }

        protected Result<T> Success<T>(T data)
        {
            return new Result<T>
            {
                Data = data,
                IsSucceed = true,
            };
        }
    }
}
