using System;
using System.Linq;
using Plum.Controllers.Models;
using Plum.Entities;

namespace Plum.Controllers.Mapper
{
    internal static class DogMapper
    {
        public static DogReadModel[] ToDogs(this Dog[] dogs)
        {
            return dogs.Select(ToDog).ToArray();
        }

        public static DogReadModel ToDog(this Dog dog)
        {
            if (dog == default)
            {
                throw new ArgumentNullException(nameof(dog));
            }

            return new DogReadModel
            {
                Id = dog.Id,
                CreatedDate = dog.CreatedDate,
                UpdatedDate = dog.UpdatedDate,
                Name = dog.Name,
                Sex = dog.Sex,
                Breed = dog.Breed,
                Avatar = dog.Avatar,
                BirthDay = dog.Birthday,
                HasManners = dog.HasManners,
                HasObedience = dog.HasObedience,
            };
        }

        public static Dog ToDog(this DogCreateModel model)
        {
            if (model == default)
            {
                throw new ArgumentNullException(nameof(model));
            }

            return new Dog
            {
                Name = model.Name,
                Breed = model.Breed,
                Sex = model.Sex,
                Avatar = model.Avatar,
                Birthday = model.Birthday,
                HasManners = model.HasManners,
                HasObedience = model.HasObedience,
            };
        }
    }
}
