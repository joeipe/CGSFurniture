using CGSFurniture.Core.Interfaces.Repository;
using CGSFurniture.Core.Model;
using CGSFurniture.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData;

namespace CGSFurniture.Web.Controllers
{
    [CustomUserAuthorize]
    public class CategoriesController : ApiControllerBase
    {
        public CategoriesController(ICGSFurnitureDBUow uow)
        {
            Uow = uow;
        }

        // GET: api/Categories
        [AllowAnonymous]
        [EnableQuery]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(Uow.Categories.GetAll());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/Categories/5
        [AllowAnonymous]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Category category = Uow.Categories.GetById(id);

                if (category == null)
                {
                    return NotFound();
                }

                return Ok(category);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/Categories
        public IHttpActionResult Post([FromBody]Category category)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Uow.Categories.Add(category);
                Uow.Save();

                return Created(new Uri(Request.RequestUri + "/" + category.CategoryID.ToString()), category);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Categories/5
        public IHttpActionResult Put(int id, [FromBody]Category category)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != category.CategoryID)
                {
                    return BadRequest();
                }

                Uow.Categories.Edit(category);
                Uow.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Categories/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Category category = Uow.Categories.GetById(id);
                if (category == null)
                {
                    return NotFound();
                }

                Uow.Categories.Delete(id);
                Uow.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [AllowAnonymous]
        [Route("api/Categories/GetCategoryProductsCount")]
        public IHttpActionResult GetCategoryProductsCount()
        {
            try
            {
                return Ok(Uow.CategoryProductsCount);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
