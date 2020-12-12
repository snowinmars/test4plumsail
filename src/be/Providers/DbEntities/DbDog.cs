using System;
using NodaTime;
using Plum.Entities.Enums;

namespace Plum.Providers.DbEntities
{
    internal class DbDog : DbItem
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
