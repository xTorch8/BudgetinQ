using ExpenseTrackerAppServer.Data;
using ExpenseTrackerAppServer.DTO.Users;
using ExpenseTrackerAppServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAppServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext  _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationDTO users) 
        {
            try
            {
               if (ModelState.IsValid)
               {
                    var checkUser = await _context.Users
                         .Where(u => u.Email == users.Email)
                         .CountAsync();

                    if (checkUser == 0)
                    {
                        var newUser = new Users
                        {
                            FirstName = users.FirstName,
                            LastName = users.LastName,
                            Email = users.Email,
                            Password = users.Password
                        };

                        await _context.Users.AddAsync(newUser);
                        await _context.SaveChangesAsync();

                        return Ok(new { success = true });
                    }

                    return Ok(new { success = false, error = "Email already registered!" });
               }
                return BadRequest(new { success = false, error = "Model state is not valid!" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO users)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkUser = await _context.Users
                        .Where(u => u.Email == users.Email && u.Password == users.Password)
                        .CountAsync();

                    if (checkUser > 0)
                    {
                         var user = await _context.Users
                            .Where(u => u.Email == users.Email && u.Password == users.Password)
                            .FirstOrDefaultAsync();

                        return Ok(new { success = true, isLogin = true, firstName = user.FirstName, lastName = user.LastName });
                    }

                    return Ok(new {success = false, error = "Invalid email and/or password"});
                }

                return BadRequest(new { success = false, error = "Model state is not valid" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPut("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO users)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkUser = await _context.Users
                        .Where(u => u.Email == users.Email)
                        .CountAsync();

                    if (checkUser > 0)
                    {
                        var user = await _context.Users
                            .Where(u => u.Email == users.Email)
                            .FirstOrDefaultAsync();

                        user.Password = users.Password;
                        await _context.SaveChangesAsync();

                        return Ok(new { success = true});
                    }

                    return Ok(new { success = false, error = "Invalid email!" });
                }

                return BadRequest(new { success = false, error = "Model state is not valid" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteUserDTO users)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var checkUser = await _context.Users
                        .Where(u => u.Email == users.Email && u.Password == users.Password)
                        .CountAsync();

                    if (checkUser > 0)
                    {
                        var user = await _context.Users
                            .Where(u => u.Email == users.Email && u.Password == users.Password)
                            .FirstOrDefaultAsync();

                        _context.Remove(user);
                        await _context.SaveChangesAsync();
                        return Ok(new { success = true });
                    }

                    return Ok(new { success = false, error = "Invalid email and/or password!" });
                }

                return BadRequest(new { success = false, error = "Model state is not valid" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
