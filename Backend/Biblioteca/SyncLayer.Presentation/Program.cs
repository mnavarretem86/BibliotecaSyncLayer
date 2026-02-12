using SyncLayer.Application.Interface;
using SyncLayer.Application.Services;
using SyncLayer.Infrastructure.DataBase;
using SyncLayer.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuración de CORS para Desarrollo (Permitir todo)
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// 2. Inyección de Dependencias
var connectionStrings = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(connectionStrings))
{
    throw new InvalidOperationException("La Cadena de conexión no puede estar vacía.");
}

builder.Services.AddSingleton(new DBConnectionFactory(connectionStrings));

// Registro de Repositorios y Servicios según tu estructura
builder.Services.AddScoped<IPersonaRepository, PersonaRepository>();
builder.Services.AddScoped<PersonaServices>();

builder.Services.AddScoped<ILibroRepository, LibroRepository>();
builder.Services.AddScoped<LibroServices>();

builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<AuthService>();

builder.Services.AddScoped<IAutorRepository, AutorRepository>();
builder.Services.AddScoped<AutorServices>();

builder.Services.AddScoped<IEstadoRepository, EstadoRepository>();
builder.Services.AddScoped<EstadoService>();


builder.Services.AddScoped<ITipoPersonaRepository, TipoPersonaRepository>();
builder.Services.AddScoped<TipoPersonaService>();








builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();





var app = builder.Build();

// 3. Middlewares
app.UseCors("DevPolicy"); // Activar CORS antes de los controladores

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();