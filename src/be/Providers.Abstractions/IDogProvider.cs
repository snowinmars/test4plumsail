using System.Threading.Tasks;
using Plum.Entities;

namespace Plum.Providers.Abstractions
{
    public interface IDogProvider
    {
        Task<Dog> CreateAsync(Dog dog);

        Task<Dog[]> ListAsync(int page, int perPage, string search);
    }
}
