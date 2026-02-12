using System.Data;
using Microsoft.Data.SqlClient;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;
using SyncLayer.Infrastructure.DataBase;

namespace SyncLayer.Infrastructure.Repository
{
    public class EstadoRepository : IEstadoRepository
    {
        private readonly DBConnectionFactory _dbConnectionFactory;
        private const string StoreProcedure = "USP_Estado";

        public EstadoRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<IEnumerable<Estado>> GetEstadoListAsync()
        {
            var lista = new List<Estado>();

            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 3);

            using var dr = await cmd.ExecuteReaderAsync();
            while (await dr.ReadAsync())
            {
                lista.Add(await MapToEstado(dr));
            }

            return lista;
        }

        private SqlCommand CreateCommand(SqlConnection con, int operacion)
        {
            var cmd = new SqlCommand(StoreProcedure, con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Operacion", SqlDbType.Int).Value = operacion;
            return cmd;
        }

        private async Task<Estado> MapToEstado(SqlDataReader dr)
        {
            return new Estado
            {
                EstadoID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("EstadoID")),
                NombreEstado = dr["NombreEstado"].ToString() ?? string.Empty,
                TipoEstado = dr["TipoEstado"].ToString() ?? string.Empty
            };
        }

        public Task CrearEstadoAsync(Estado estado)
        {
            throw new NotImplementedException();
        }

        public Task UpdateEstadoAsync(Estado estado)
        {
            throw new NotImplementedException();
        }
    }
}
