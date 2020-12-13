using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Plum.Entities;
using Plum.Providers.Abstractions;
using Plum.Services.Abstractions;

namespace Plum.Services
{
    internal class DogService : BaseService, IDogService
    {
        public DogService(ILogger<BaseService> logger,
            IDogProvider dogProvider)
            : base(logger)
        {
            this.dogProvider = dogProvider;
        }

        private readonly IDogProvider dogProvider;

        public Task<Dog> CreateAsync(Dog dog)
        {
            return dogProvider.CreateAsync(dog);
        }

        public Task<(Dog[] dogs, long count)> ListAsync(int page, int perPage, string search)
        {
            return dogProvider.ListAsync(page, perPage, search);
        }
    }
}
