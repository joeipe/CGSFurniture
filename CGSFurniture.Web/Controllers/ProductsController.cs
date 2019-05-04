using CGSFurniture.Core.Interfaces.Repository;
using CGSFurniture.Core.Model;
using CGSFurniture.Web.Helpers;
using CGSFurniture.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.OData;

namespace CGSFurniture.Web.Controllers
{
    [CustomUserAuthorize]
    public class ProductsController : ApiControllerBase
    {
        public ProductsController(ICGSFurnitureDBUow uow)
        {
            Uow = uow;
        }

        // GET: api/Products
        [AllowAnonymous]
        [EnableQuery]
        public IHttpActionResult Get()
        {
            try
            {
                List<ProductVM> result = new List<ProductVM>();
                var products = Uow.Products.GetAll();
                foreach (var product in products)
                {
                    result.Add(new ProductVM() {
                        ProductID = product.ProductID,
                        ProductName = product.ProductName,
                        Description = product.Description,
                        CategoryID = product.CategoryID,
                        UnitPrice = product.UnitPrice,
                        OriginalUnitPrice = product.OriginalUnitPrice,
                        Details = product.Details,
                        DefaultPictureID = product.DefaultPictureID,
                        Discontinued = product.Discontinued,
                        CategoryName = Uow.Categories.GetById(product.CategoryID.Value).CategoryName,
                    });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/Products/5
        [AllowAnonymous]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Product product = Uow.Products.GetById(id);

                if (product == null)
                {
                    return NotFound();
                }

                return Ok(product);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/Products
        public IHttpActionResult Post([FromBody]Product product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Uow.Products.Add(product);
                Uow.Save();

                return Created(new Uri(Request.RequestUri + "/" + product.ProductID.ToString()), product);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != product.ProductID)
                {
                    return BadRequest();
                }

                Uow.Products.Edit(product);
                Uow.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Products/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Product product = Uow.Products.GetById(id);
                if (product == null)
                {
                    return NotFound();
                }

                Uow.Products.Delete(id);
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
