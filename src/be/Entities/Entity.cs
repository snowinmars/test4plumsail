using System;
using NodaTime;

namespace Plum.Entities
{
    public abstract class Entity
    {
        public Guid Id { get; set; }

        public Instant CreatedDate { get; set; }

        public Instant UpdatedDate { get; set; }
    }
}