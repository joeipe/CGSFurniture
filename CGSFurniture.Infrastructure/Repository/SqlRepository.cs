using CGSFurniture.Core.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.Entity;

namespace CGSFurniture.Infrastructure.Repository
{
    public class SqlRepository<T> : IRepository<T> where T : class
    {
        protected DbContext DataContext;
        protected DbSet<T> DataTable;

        public SqlRepository(DbContext dataContext)
        {
            if (dataContext == null)
            {
                throw new ArgumentNullException("dataContext");
            }
            DataContext = dataContext;
            DataTable = DataContext.Set<T>();
        }

        public virtual void Add(T entity)
        {
            DataTable.Add(entity);
        }

        public virtual void Delete(int id)
        {
            var entity = DataTable.Find(id);
            DataTable.Remove(entity);
        }

        public virtual void Edit(T entity)
        {
            DataContext.Entry(entity).State = EntityState.Modified;
        }

        public virtual IQueryable<T> GetAll()
        {
            return DataTable;
        }

        public virtual T GetById(int id)
        {
            return DataTable.Find(id);
        }

        public virtual IQueryable<T> SearchFor(Expression<Func<T, bool>> predicate)
        {
            return DataTable.Where(predicate);
        }
    }
}
