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
    }
}
