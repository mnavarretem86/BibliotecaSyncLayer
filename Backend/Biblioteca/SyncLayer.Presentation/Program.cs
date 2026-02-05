using SyncLayer.Application.Interface;
using SyncLayer.Application.Services;
using SyncLayer.Infrastructure.DataBase;
using SyncLayer.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//Inyecion de dependencias :

var  connectionStrings = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionStrings))
{

    throw new InvalidOperationException("La Cadena no puede venir Vacia");
}
builder.Services.AddSingleton(new DBConnectionFactory(connectionStrings));


builder.Services.AddScoped<IPersonaRepository, PersonaRepository>();
builder.Services.AddScoped<PersonaServices>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
