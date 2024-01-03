using ExpenseTrackerAppServer.Data;
using ExpenseTrackerAppServer.DTO.Incomes;
using ExpenseTrackerAppServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAppServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncomesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IncomesController(AppDbContext context)
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

                        var categoryTotals = await _context.Incomes
                            .Where(e => e.UserId == userId)
                            .GroupBy(e => e.IncomeCategory)
                            .Select(g => new
                            {
                                Category = g.Key,
                                TotalIncome = g.Sum(e => e.IncomeAmount)
                            })
                            .ToListAsync();

                        var monthlyTotals = await _context.Incomes
                            .Where(e => e.UserId == userId)
                            .GroupBy(e => new { e.IncomeDate.Year, e.IncomeDate.Month })
                            .Select(g => new
                            {
                                Year = g.Key.Year,
                                Month = g.Key.Month,
                                TotalIncome = g.Sum(e => e.IncomeAmount)
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

                        var incomes = await _context.Incomes
                            .Where(e => e.UserId == userId)
                            .OrderBy(e => e.IncomeDate)
                            .ToListAsync();

                        if (sortBy == "name")
                        {
                            incomes = await _context.Incomes
                                .Where(e => e.UserId == userId)
                                .OrderBy(e => e.IncomeName)
                                .ToListAsync();
                        }
                        else if (sortBy == "category")
                        {
                            incomes = await _context.Incomes
                                .Where(e => e.UserId == userId)
                                .OrderBy(e => e.IncomeCategory)
                                .ToListAsync();
                        }
                        else if (sortBy == "amount")
                        {
                            incomes = await _context.Incomes
                                .Where(e => e.UserId == userId)
                                .OrderBy(e => e.IncomeAmount)
                                .ToListAsync();
                        }


                        return Ok(new { success = true, incomes = incomes });

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
        public async Task<IActionResult> Create([FromBody] CreateIncomesDTO income)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkAccount = await _context.Users
                        .Where(u => u.Email == income.UserEmail)
                        .CountAsync();

                    if (checkAccount > 0)
                    {
                        var account = await _context.Users
                            .Where(u => u.Email == income.UserEmail)
                            .FirstOrDefaultAsync();

                        var incomes = new Incomes
                        {
                            IncomeName = income.Name,
                            IncomeAmount = income.Amount,
                            IncomeDate = income.Date,
                            IncomeCategory = income.Category,
                            UserId = account.UserId
                        };

                        _context.Add(incomes);
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

        [HttpPut("Edit")]
        public async Task<IActionResult> Edit([FromBody] EditIncomesDTO income)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkAccount = await _context.Users
                        .Where(u => u.Email == income.UserEmail)
                        .CountAsync();

                    if (checkAccount > 0)
                    {
                        var incomes = await _context.Incomes
                            .Where(e => e.IncomeId == income.Id)
                            .FirstOrDefaultAsync();

                        if (incomes != null)
                        {
                            incomes.IncomeName = income.Name;
                            incomes.IncomeAmount = income.Amount;
                            incomes.IncomeCategory = income.Category;
                            incomes.IncomeDate = income.Date;
                            await _context.SaveChangesAsync();
                            return Ok(new { success = true });
                        }

                        return Ok(new { success = false, error = "Income not found!" });
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
        public async Task<IActionResult> Delete([FromBody] DeleteIncomesDTO income)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var checkAccount = await _context.Users
                        .Where(u => u.Email == income.UserEmail)
                        .CountAsync();

                    if (checkAccount > 0)
                    {
                        var incomes = await _context.Incomes
                            .Where(e => e.IncomeId == income.Id)
                            .FirstOrDefaultAsync();

                        _context.Remove(incomes);
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
