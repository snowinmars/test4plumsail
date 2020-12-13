using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Plum.Entities;
using Plum.Providers.Abstractions;
using Plum.Providers.DbEntities;
using Plum.Providers.Helpers;
using Plum.Providers.Mappers;

namespace Plum.Providers
{
    internal class DogProvider : BaseProvider, IDogProvider
    {
        public DogProvider(ILogger<BaseProvider> logger,
            IDbConnection connection,
            IDapperBuilder dapperBuilder)
            : base(logger, connection, dapperBuilder)
        {
        }

        public async Task<Dog> CreateAsync(Dog dog)
        {
            var dbDog = await DapperBuilder.Call(Connection)
                         .Procedure(Procedures.Dog.Create)
                         .WithParameter("_id", Guid.NewGuid())
                         .WithParameter("_name", dog.Name)
                         .WithParameter("_avatar", dog.Avatar)
                         .WithParameter("_sex", dog.Sex)
                         .WithParameter("_breed", dog.Breed)
                         .WithParameter("_birthday", dog.Birthday)
                         .WithParameter("_hasManners", dog.HasManners)
                         .WithParameter("_hasObedience", dog.HasObedience)
                         .ExecuteOneAsync<DbDog>();

            return dbDog.ToDog();
        }

        public async Task<Dog[]> ListAsync(int page, int perPage, string search)
        {
            var dbDogs = await DapperBuilder.Call(Connection)
                                            .Procedure(Procedures.Dog.List)
                                            .WithParameter("_page", page)
                                            .WithParameter("_perPage", perPage)
                                            .WithParameter("_search", $"%{search}%")
                                            .ExecuteManyAsync<DbDog>();

            return dbDogs.Select(DogMapper.ToDog).ToArray();
        }
    }
}
