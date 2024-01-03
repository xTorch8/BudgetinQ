using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAppServer.DTO.Users
{
    public class DeleteUserDTO
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }    
    }
}
