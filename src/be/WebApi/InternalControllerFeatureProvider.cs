using System.Reflection;
using Microsoft.AspNetCore.Mvc.Controllers;
using Plum.Controllers;

namespace Plum.WebApi
{
    internal class InternalControllerFeatureProvider : ControllerFeatureProvider
    {
        protected override bool IsController(TypeInfo typeInfo)
        {
            var isCustomController = !typeInfo.IsAbstract && typeof(BaseController).IsAssignableFrom(typeInfo);

            return isCustomController || base.IsController(typeInfo);
        }
    }
}