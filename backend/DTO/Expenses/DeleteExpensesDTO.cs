using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.DTO.Expenses
{
    public class DeleteExpensesDTO
    {
        [Required]
        public string UserEmail { get; set; }

        [Required]
        public int Id { get; set; }
    }
}
