using System.Linq;
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
        public async Task<Result<DogReadModel>> CreateAsync(DogCreateModel model)
        {
            var dog = model.ToDog();

            var addedDog = await dogService.CreateAsync(dog);

            return Success(addedDog.ToDog());
        }

        [HttpGet("")]
        public async Task<Result<DogReadModel[]>> ListAsync(int page = 0,
            int perPage = 10,
            string search = "")
        {
            var dogs = await dogService.ListAsync(page, perPage, search);

            return Success(dogs.Select(x => x.ToDog()).ToArray());
        }
    }
}
