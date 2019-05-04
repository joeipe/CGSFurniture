using CGSFurniture.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CGSFurniture.Core.Interfaces.Repository
{
    public interface ICGSFurnitureDBUow : IDisposable
    {
        IRepository<Category> Categories { get; }
        IRepository<Product> Products { get; }
        IRepository<ProductImage> ProductImage { get; }
        IEnumerable<CategoryProductsCount_Result> CategoryProductsCount { get; }

        void Save();
    }
}
