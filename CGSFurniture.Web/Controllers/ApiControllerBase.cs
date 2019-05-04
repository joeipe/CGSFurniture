using CGSFurniture.Core.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CGSFurniture.Web.Controllers
{
    public abstract class ApiControllerBase : ApiController
    {
        public ICGSFurnitureDBUow Uow { get; set; }
    }
}