using System;
using NodaTime;

namespace Plum.Providers.DbEntities
{
    internal abstract class DbItem
    {
        public Guid Id { get; set; }

        public Instant CreatedDate { get; set; }

        public Instant UpdatedDate { get; set; }
    }
}
