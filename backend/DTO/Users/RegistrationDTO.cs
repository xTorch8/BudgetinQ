using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.DTO.Users
{
    public class RegistrationDTO
    {

        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
