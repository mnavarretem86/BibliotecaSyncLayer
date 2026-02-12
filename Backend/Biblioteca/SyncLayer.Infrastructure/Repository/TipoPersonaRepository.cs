using System.Data;
using Microsoft.Data.SqlClient;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;
using SyncLayer.Infrastructure.DataBase;

namespace SyncLayer.Infrastructure.Repository
{
    public class TipoPersonaRepository : ITipoPersonaRepository
    {
        private readonly DBConnectionFactory _dbConnectionFactory;
        private const string StoreProcedure = "USP_TipoPersona";

        public TipoPersonaRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<IEnumerable<TipoPersona>> GetAllTipoPersonaAsync()
        {
            var lista = new List<TipoPersona>();

            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 3);

            using var dr = await cmd.ExecuteReaderAsync();
            while (await dr.ReadAsync())
            {
                lista.Add(await MapToTipoPersona(dr));
            }

            return lista;
        }

        private SqlCommand CreateCommand(SqlConnection con, int operacion)
        {
            var cmd = new SqlCommand(StoreProcedure, con)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.Add("@Operacion", SqlDbType.Int).Value = operacion;
            return cmd;
        }

        private async Task<TipoPersona> MapToTipoPersona(SqlDataReader dr)
        {
            return new TipoPersona
            {
                TipoPersonaID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("TipoPersonaID")),
                NombreTipo = dr["NombreTipo"].ToString() ?? string.Empty,
                Descripcion = dr["Descripcion"].ToString() ?? string.Empty
            };
        }


        public Task CrearTipoPersonaAsync(TipoPersona tipoPersona) => throw new NotImplementedException();
        public Task ActualizarTipoPersonaAsync(TipoPersona tipoPersona) => throw new NotImplementedException();
    }
}