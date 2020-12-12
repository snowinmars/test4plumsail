using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Plum.Controllers.Mapper;
using Plum.Controllers.Models;
using Plum.Services.Abstractions;

namespace Plum.Controllers
{
    [ApiController]
    [Route("api/dogs")]
    [AllowAnonymous]
    internal class DogController : BaseController
    {
        private readonly IDogService dogService;

        public DogController(ILogger<BaseController> logger,
            IDogService dogService)
            : base(logger)
        {
            this.dogService = dogService;
        }

        [HttpPost("")]
        public async Task<DogReadModel> AddAsync(DogCreateModel model)
        {
            var dog = model.ToDog();

            var addedDog = await dogService.AddAsync(dog);

            return addedDog.ToDog();
        }
    }
}
