using ExpenseTrackerAppServer.Data;
using Microsoft.EntityFrameworkCore;

/*
    ExpenseTrackerAppServer
    Created by Evan Santosa - 2023
*/

/*
    The server using Microsoft SQL Server as the database.
    The database have three tables: Users, Expenses, and Categories.
    
    The Users table have UserId, FirstName, LastName, Email, and Password columns.
    The Expenses table have ExpenseId, UserId, ExpenseName, ExpenseAmount, 
    ExpenseCategory, and ExpenseDate columns.
    The Categories table have CategoryId and CategoryName columns.

    This server have two controllers: Expenses and Users.
    Expenses controller will handle user registration, login, reset password, and delete user.
    Users controller will handle create, edit, and delete expenses.
*/


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
{
    build.WithOrigins("http://localhost:3000") // url for the client side
       .AllowAnyMethod()
       .AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corspolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
