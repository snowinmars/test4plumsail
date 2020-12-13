using System.Threading.Tasks;
using Plum.Entities;

namespace Plum.Services.Abstractions
{
    public interface IDogService
    {
        Task<Dog> CreateAsync(Dog dog);

        Task<(Dog[] dogs, long count)> ListAsync(int page, int perPage, string search);
    }
}