using System;
using NodaTime;
using Plum.Entities.Enums;

namespace Plum.Controllers.Models
{
    internal class DogCreateModel : Model
    {
        public string Name { get; set; }

        public Sex Sex { get; set; }

        public Breed Breed { get; set; }

        public LocalDate Birthday { get; set; }

        public Uri Avatar { get; set; }

        public bool HasObedience { get; set; }

        public bool HasManners { get; set; }
    }
}