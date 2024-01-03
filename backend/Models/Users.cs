using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseTrackerAppServer.Models
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }

        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
