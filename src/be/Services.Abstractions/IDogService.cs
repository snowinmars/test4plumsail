using System.Threading.Tasks;
using Plum.Entities;

namespace Plum.Services.Abstractions
{
    public interface IDogService
    {
        Task<Dog> AddAsync(Dog dog);
    }
}
