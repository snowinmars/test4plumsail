using System;
using NodaTime;
using Plum.Entities.Enums;

namespace Plum.Controllers.Models
{
    internal class DogReadModel : Model
    {
        public Guid Id { get; set; }

        public Instant CreatedDate { get; set; }

        public Instant UpdatedDate { get; set; }

        public string Name { get; set; }

        public Sex Sex { get; set; }

        public Breed Breed { get; set; }

        public LocalDate BirthDay { get; set; }

        public Uri Avatar { get; set; }

        public bool HasObedience { get; set; }

        public bool HasManners { get; set; }
    }
}