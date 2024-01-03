using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.DTO.Incomes
{
    public class DeleteIncomesDTO
    {
        [Required]
        public string UserEmail { get; set; }

        [Required]
        public int Id { get; set; }
    }
}
