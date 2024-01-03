using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.DTO.Incomes
{
    public class EditIncomesDTO
    {
        [Required]
        public string UserEmail { get; set; }

        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public int Category { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
