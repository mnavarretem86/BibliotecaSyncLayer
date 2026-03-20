using Microsoft.Data.SqlClient;
using System.Data;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Infrastructure.DataBase;

namespace SyncLayer.Infrastructure.Repository
{
    public class ReporteMoraRepository : IReporteMoraRepository
    {
        private readonly DBConnectionFactory _connectionFactory;

        public ReporteMoraRepository(DBConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<List<ReporteMoraDto>> ObtenerReporteMoraAsync()
        {
            var lista = new List<ReporteMoraDto>();

            using var connection = _connectionFactory.CreateConnection();
            using var command = new SqlCommand("USP_ReporteMora", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            await connection.OpenAsync();

            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                lista.Add(new ReporteMoraDto
                {
                    NombrePersona = reader["NombrePersona"]?.ToString() ?? string.Empty,
                    Libro = reader["Libro"]?.ToString() ?? string.Empty,
                    FechaPrestamo = reader.GetDateTime(reader.GetOrdinal("FechaPrestamo")),
                    FechaVencimiento = reader.GetDateTime(reader.GetOrdinal("FechaVencimiento")),
                    DiasMora = reader.GetInt32(reader.GetOrdinal("DiasMora")),
                    MontoAdeudado = reader["MontoAdeudado"] != DBNull.Value
                        ? Convert.ToDecimal(reader["MontoAdeudado"])
                        : 0
                });
            }

            return lista;
        }
    }
}