using Microsoft.Data.SqlClient;
using System.Data;
using SyncLayer.Application.Interface;
using SyncLayer.Application.Models;
using SyncLayer.Infrastructure.DataBase;

namespace SyncLayer.Infrastructure.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DBConnectionFactory _connectionFactory;

        public AuthRepository(DBConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<LoginData?> ObtenerUsuarioPorEmailAsync(string email)
        {
            using var connection = _connectionFactory.CreateConnection();
            using var command = new SqlCommand("UPS_LOGIN", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.AddWithValue("@Email", email);

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                return null;

            return new LoginData
            {
                UsuarioID = reader.GetInt32(reader.GetOrdinal("UsuarioID")),
                PersonaID = reader.GetInt32(reader.GetOrdinal("PersonaID")),
                RolID = reader.GetInt32(reader.GetOrdinal("RolID")),
                PrimerNombre = reader["PrimerNombre"]?.ToString() ?? string.Empty,
                PrimerApellido = reader["PrimerApellido"]?.ToString() ?? string.Empty,
                Email = reader["Email"]?.ToString() ?? string.Empty,
                PasswordHash = reader["PasswordHash"]?.ToString() ?? string.Empty,
                NombreRol = reader["NombreRol"]?.ToString() ?? string.Empty
            };
        }
    }
}
