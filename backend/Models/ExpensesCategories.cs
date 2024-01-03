using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.Models
{
    public class ExpensesCategories
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        public string CategoryName { get; set;}
    }
}
