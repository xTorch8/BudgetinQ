using ExpenseTrackerAppServer.Models;
using Microsoft.EntityFrameworkCore;


namespace ExpenseTrackerAppServer.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }

        public DbSet<Expenses> Expenses { get; set; }

        public DbSet<ExpensesCategories> ExpensesCategories { get; set; }

        public DbSet<Incomes> Incomes { get; set; }

        public DbSet<IncomesCategories> IncomesCategories { get; set;}

    }
}
