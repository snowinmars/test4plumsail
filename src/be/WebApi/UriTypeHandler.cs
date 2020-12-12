using System;
using System.Data;
using Dapper;

namespace Plum.WebApi
{
    public class UriTypeHandler : SqlMapper.TypeHandler<Uri>
    {
        public override Uri Parse(object value)
        {
            return new Uri((string)value);
        }

        public override void SetValue(IDbDataParameter parameter, Uri value)
        {
            parameter.Value = value.ToString();
        }
    }
}