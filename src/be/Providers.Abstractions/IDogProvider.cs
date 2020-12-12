using System.Threading.Tasks;
using Plum.Entities;

namespace Plum.Providers.Abstractions
{
    public interface IDogProvider
    {
        Task<Dog> AddAsync(Dog dog);
    }
}
