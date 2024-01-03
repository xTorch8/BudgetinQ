using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;

namespace ExpenseTrackerAppServer.Models
{
    public class Expenses
    {
        [Key]
        public int ExpenseId { get; set; }

        [ForeignKey("Users")]
        public int UserId { get; set; }

        [Required]
        public string ExpenseName { get; set; }

        [Required]
        public decimal ExpenseAmount { get; set; }

        [Required]
        public int ExpenseCategory {  get; set; }

        [Required]
        public DateTime ExpenseDate { get; set; }

    }
}
