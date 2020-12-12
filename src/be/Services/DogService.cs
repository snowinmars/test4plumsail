using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Plum.Entities;
using Plum.Providers.Abstractions;
using Plum.Services.Abstractions;

namespace Plum.Services
{
    public class DogService : BaseService, IDogService
    {
        private readonly IDogProvider dogProvider;

        public DogService(ILogger<BaseService> logger,
            IDogProvider dogProvider)
            : base(logger)
        {
            this.dogProvider = dogProvider;
        }

        public Task<Dog> AddAsync(Dog dog)
        {
            return dogProvider.AddAsync(dog);
        }
    }
}
