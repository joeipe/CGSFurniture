using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CGSFurniture.Core.Interfaces.Repository
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll();
        IQueryable<T> SearchFor(Expression<Func<T, bool>> predicate);
        T GetById(int id);
        void Add(T entity);
        void Edit(T entity);
        void Delete(int id);
    }
}
