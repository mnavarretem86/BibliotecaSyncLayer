using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;
using SyncLayer.Infrastructure.DataBase;

namespace SyncLayer.Infrastructure.Repository
{
    public class AutorRepository : IAutorRepository
    {
        private readonly DBConnectionFactory _dBConnectionFactory;
        private const string StoreProcedure = "UPS_AUTOR";

        public AutorRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dBConnectionFactory = dbConnectionFactory;
        }

        public async Task CrearAutorAsync(Autor autor)
        {
            using var con = _dBConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 1);
            AddParameters(cmd, autor);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task ActualizarAutorAsync(Autor autor)
        {
            using var con = _dBConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 2);
            AddParameters(cmd, autor);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<Autor?> ObtenerAutorPorIdAsync(int autorId)
        {
            using var con = _dBConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 3);
            cmd.Parameters.Add("@AutorID", SqlDbType.Int).Value = autorId;

            using var dr = await cmd.ExecuteReaderAsync();
            if (await dr.ReadAsync())
            {
                return await MapToAutor(dr);
            }

            return null;
        }

        public async Task<IEnumerable<Autor>> ListarAutorAsync()
        {
            var lista = new List<Autor>();

            using var con = _dBConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 4);
            using var dr = await cmd.ExecuteReaderAsync();

            while (await dr.ReadAsync())
            {
                lista.Add(await MapToAutor(dr));
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

        private void AddParameters(SqlCommand cmd, Autor a)
        {
            cmd.Parameters.Add("@AutorID", SqlDbType.Int)
                .Value = (object?)a.AutorID ?? DBNull.Value;

            cmd.Parameters.Add("@PrimerNombre", SqlDbType.VarChar, 100)
                .Value = a.PrimerNombre;

            cmd.Parameters.Add("@PrimerApellido", SqlDbType.VarChar, 100)
                .Value = a.PrimerApellido;

            cmd.Parameters.Add("@SegundoApellido", SqlDbType.VarChar, 100)
                .Value = (object?)a.SegundoApellido ?? DBNull.Value;

            cmd.Parameters.Add("@Nacionalidad", SqlDbType.VarChar, 100)
                .Value = (object?)a.Nacionalidad ?? DBNull.Value;

            cmd.Parameters.Add("@EstadoID", SqlDbType.Int)
                .Value = (object?)a.EstadoID ?? DBNull.Value;
        }

        private async Task<Autor> MapToAutor(SqlDataReader dr)
        {
            return new Autor
            {
                AutorID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("AutorID")),
                PrimerNombre = dr["PrimerNombre"]?.ToString() ?? string.Empty,
                PrimerApellido = dr["PrimerApellido"]?.ToString() ?? string.Empty,
                SegundoApellido = dr["SegundoApellido"] as string,
                Nacionalidad = dr["Nacionalidad"] as string,
                EstadoID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("EstadoID"))
            };
        }
    }
}
