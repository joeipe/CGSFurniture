using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;

namespace CGSFurniture.Web.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class CustomUserAuthorizeAttribute : AuthorizeAttribute
    {
        public CustomUserAuthorizeAttribute()
        {
            this.Users = WebConfigurationManager.AppSettings["adminUsers"];
        }
    }
}