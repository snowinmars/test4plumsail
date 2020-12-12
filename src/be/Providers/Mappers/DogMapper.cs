using System;
using Plum.Entities;
using Plum.Providers.DbEntities;

namespace Plum.Providers.Mappers
{
    internal static class DogMapper
    {
        public static Dog ToDog(DbDog dbDog)
        {
            if (dbDog == default)
            {
                throw new ArgumentNullException(nameof(dbDog));
            }

            return new Dog
            {
                Id = dbDog.Id,
                CreatedDate = dbDog.CreatedDate,
                UpdatedDate = dbDog.UpdatedDate,
                Name = dbDog.Name,
                Sex = dbDog.Sex,
                Breed = dbDog.Breed,
                Birthday = dbDog.Birthday,
                Avatar = dbDog.Avatar,
                HasManners = dbDog.HasManners,
                HasObedience = dbDog.HasObedience,
            };
        }
    }
}
