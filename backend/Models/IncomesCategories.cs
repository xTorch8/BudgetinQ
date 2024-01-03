using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.Models
{
    public class IncomesCategories
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        public string CategoryName { get; set; }
    }
}
