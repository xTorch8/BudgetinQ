using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;

namespace ExpenseTrackerAppServer.Models
{
    public class Incomes
    {
        [Key]
        public int IncomeId { get; set; }

        [ForeignKey("Users")]
        public int UserId { get; set; }

        [Required]
        public string IncomeName { get; set; }

        [Required]
        public decimal IncomeAmount { get; set; }

        [Required]
        public int IncomeCategory { get; set; }

        [Required]
        public DateTime IncomeDate { get; set; }
        
    }
}
