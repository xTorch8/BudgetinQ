using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.DTO.Expenses
{
    public class GetExpensesDTO
    {
        [Required]
        public string UserEmail { get; set; }

        public int sortBy { get; set; }
    }
}
