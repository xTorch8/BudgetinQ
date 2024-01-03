using ExpenseTrackerAppServer.Data;
using ExpenseTrackerAppServer.DTO.Expenses;
using ExpenseTrackerAppServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAppServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpensesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetSummary")]
        public async Task<IActionResult> GetSummary(string userEmail)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _context.Users
                        .FirstOrDefaultAsync(u => u.Email == userEmail);

                    if (user != null)
                    {
                        var userId = user.UserId;

                        var categoryTotals = await _context.Expenses
                            .Where(e => e.UserId == userId)
                            .GroupBy(e => e.ExpenseCategory)
                            .Select(g => new
                            {
                                Category = g.Key,
                                TotalExpense = g.Sum(e => e.ExpenseAmount)
                            })
                            .ToListAsync();

                        var monthlyTotals = await _context.Expenses 
                            .Where(e => e.UserId == userId)
                            .GroupBy(e => new { e.ExpenseDate.Year, e.ExpenseDate.Month })
                            .Select(g => new
                            {
                                Year = g.Key.Year,
                                Month = g.Key.Month,
                                TotalExpense = g.Sum(e => e.ExpenseAmount)
                            })
                            .OrderBy(g => g.Year)
                            .ThenBy(g => g.Month)
                            .ToListAsync();

                        return Ok(new { success = true, categoryTotals = categoryTotals, monthlyTotals = monthlyTotals });
                    }

                    return Ok(new { success = false, error = "User not found!" });
                }

                return BadRequest(new { success = false, error = "Model state is not valid" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get(string UserEmail, string sortBy)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkAccount = await _context.Users
                        .Where(u => u.Email == UserEmail)
                        .CountAsync();

                    if (checkAccount > 0)
                    {
                        var account = await _context.Users
                            .Where(u => u.Email == UserEmail)
                            .FirstOrDefaultAsync();

                        var userId = account.UserId;

                        var expenses = await _context.Expenses
                            .Where(e => e.UserId == userId)
                            .OrderBy(e => e.ExpenseDate)
                            .ToListAsync();

                        if (sortBy == "name")
                        {
                            expenses = await _context.Expenses
                                .Where(e => e.UserId == userId)
                                .OrderBy(e => e.ExpenseName)
                                .ToListAsync();
                        }
                        else if (sortBy == "category")
                        {
                            expenses = await _context.Expenses
                                .Where(e => e.UserId == userId)
                                .OrderBy(e => e.ExpenseCategory)
                                .ToListAsync();
                        }
                        else if (sortBy == "amount")
                        {
                            expenses = await _context.Expenses
                                .Where(e => e.UserId == userId)
                                .OrderBy(e => e.ExpenseAmount)
                                .ToListAsync();
                        }


                        return Ok(new { success = true, expenses = expenses });

                    }

                    return Ok(new { success = false, error = "User not found!" });
                }

                return BadRequest(new { success = false, error = "Model state is not valid" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateExpensesDTO expense)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkAccount = await _context.Users
                        .Where(u => u.Email == expense.UserEmail)
                        .CountAsync();

                    if (checkAccount > 0)
                    {
                        var account = await _context.Users
                            .Where(u => u.Email == expense.UserEmail)
                            .FirstOrDefaultAsync();

                        var expenses = new Expenses
                        {
                            ExpenseName = expense.Name,
                            ExpenseAmount = expense.Amount,
                            ExpenseDate = expense.Date,
                            ExpenseCategory = expense.Category,
                            UserId = account.UserId
                        };

                        _context.Add(expenses);
                        await _context.SaveChangesAsync();
                        return Ok(new { success = true });
                    }

                    return Ok(new { success = false, error = "User not found!" });
                }

                return BadRequest(new { success = false, error = "Model state is not valid" });

            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPut("Edit")]
        public async Task<IActionResult> Edit([FromBody] EditExpensesDTO expense)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkAccount = await _context.Users
                        .Where(u => u.Email == expense.UserEmail)
                        .CountAsync();

                    if (checkAccount > 0)
                    {
                        var expenses = await _context.Expenses
                            .Where(e => e.ExpenseId == expense.Id)
                            .FirstOrDefaultAsync();

                        if (expense != null)
                        {
                            expenses.ExpenseName = expense.Name;
                            expenses.ExpenseAmount = expense.Amount;
                            expenses.ExpenseCategory = expense.Category;
                            expenses.ExpenseDate = expense.Date;
                            await _context.SaveChangesAsync();
                            return Ok(new { success = true });
                        }

                        return Ok(new { success = false, error = "Expense not found!" });
                    }

                    return Ok(new { success = false, error = "User not found!" });
                }

                return BadRequest(new { success = false, error = "Model state is not valid" });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteExpensesDTO expense) 
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkAccount = await _context.Users
                        .Where(u => u.Email == expense.UserEmail)
                        .CountAsync();

                    if (checkAccount > 0)
                    {
                        var expenses = await _context.Expenses
                            .Where(e => e.ExpenseId == expense.Id)
                            .FirstOrDefaultAsync();

                        _context.Remove(expenses);
                        await _context.SaveChangesAsync();
                        return Ok(new { success = true });
                    }

                    return Ok(new { success = false, error = "User not found!" });
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
