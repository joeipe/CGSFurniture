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
    public class ProductImagesController : ApiControllerBase
    {
        public ProductImagesController(ICGSFurnitureDBUow uow)
        {
            Uow = uow;
        }

        // GET: api/ProductImages
        [AllowAnonymous]
        [EnableQuery]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(Uow.ProductImage.GetAll());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/ProductImages/5
        [AllowAnonymous]
        public IHttpActionResult Get(int id)
        {
            try
            {
                ProductImage productImage = Uow.ProductImage.GetById(id);

                if (productImage == null)
                {
                    return NotFound();
                }

                return Ok(productImage);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/ProductImages
        public IHttpActionResult Post([FromBody]ProductImage productImage)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Uow.ProductImage.Add(productImage);
                Uow.Save();

                return Created(new Uri(Request.RequestUri + "/" + productImage.ProductImagesID.ToString()), productImage);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/ProductImages/5
        public IHttpActionResult Put(int id, [FromBody]ProductImage productImage)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != productImage.ProductImagesID)
                {
                    return BadRequest();
                }

                Uow.ProductImage.Edit(productImage);
                Uow.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/ProductImages/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                ProductImage productImage = Uow.ProductImage.GetById(id);
                if (productImage == null)
                {
                    return NotFound();
                }

                Uow.ProductImage.Delete(id);
                Uow.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
