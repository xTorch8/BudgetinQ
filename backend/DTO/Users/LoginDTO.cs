using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.DTO.Users
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
