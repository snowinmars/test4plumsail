using System.Threading.Tasks;
using Plum.Entities;

namespace Plum.Services.Abstractions
{
    public interface IDogService
    {
        Task<Dog> CreateAsync(Dog dog);

        Task<Dog[]> ListAsync(int page, int perPage, string search);
    }
}
