using CGSFurniture.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CGSFurniture.Web.Models
{
    public class ProductVM
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public Nullable<int> CategoryID { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> OriginalUnitPrice { get; set; }
        public string Details { get; set; }
        public string DefaultPictureID { get; set; }
        public bool Discontinued { get; set; }
        public string CategoryName { get; set; }
    }
}