using ExpenseTrackerAppServer.Data;
using ExpenseTrackerAppServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAppServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesCategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpensesCategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var categories = await _context.ExpensesCategories
                        .ToListAsync();
                    return Ok(new {success = true, categories = categories});
                }

                return Ok(new { success = false, error = "Model state is not valid" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

        }
    }

}
