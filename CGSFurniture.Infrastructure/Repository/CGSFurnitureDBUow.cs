using CGSFurniture.Core.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CGSFurniture.Core.Model;
using CGSFurniture.Infrastructure.Data;
using System.Data.Entity.Core.Objects;

namespace CGSFurniture.Infrastructure.Repository
{
    public class CGSFurnitureDBUow : ICGSFurnitureDBUow
    {
        private CGSFurnitureDBEntities context;

        public IRepository<Category> Categories { get { return new SqlRepository<Category>(context); } }

        public IRepository<Product> Products { get { return new SqlRepository<Product>(context); } }

        public IRepository<ProductImage> ProductImage { get { return new SqlRepository<ProductImage>(context); } }

        public IEnumerable<CategoryProductsCount_Result> CategoryProductsCount { get { return context.CategoryProductsCount(); } }

        public CGSFurnitureDBUow()
        {
            CreateDbContext();
        }

        private void CreateDbContext()
        {
            context = new CGSFurnitureDBEntities();
            context.Configuration.ProxyCreationEnabled = false;
            context.Configuration.LazyLoadingEnabled = false;
            context.Configuration.ValidateOnSaveEnabled = false;
        }

        public void Dispose()
        {
            context.Dispose();
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
