using System;
using NodaTime;
using Plum.Entities.Enums;

namespace Plum.Providers.DbEntities
{
    // Can't search by enum as string due to
    // https://github.com/StackExchange/Dapper/issues/259
    // I can find a workaround but I'd prefer not to
    internal class DbDog : DbItem
    {
        public string Name { get; set; }

        public Sex Sex { get; set; }

        public Breed Breed { get; set; }

        public LocalDate BirthDay { get; set; }

        public Uri Avatar { get; set; }

        public bool HasObedience { get; set; }

        public bool HasManners { get; set; }
    }
}