using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;
using SyncLayer.Infrastructure.DataBase;

namespace SyncLayer.Infrastructure.Repository
{
    public class RolRepository : IRolRepository
    {
        private readonly DBConnectionFactory _dbConnectionFactory;
        private const string StoreProcedure = "USP_Rol";

        public RolRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task CrearRolAsync(Rol rol)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 1);
            AddParameters(cmd, rol);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task ActualizarRolAsync(Rol rol)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 2);
            cmd.Parameters.Add("@RolID", SqlDbType.Int).Value = rol.RolID;

            AddParameters(cmd, rol);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<IEnumerable<Rol>> ListarRolesAsync()
        {
            var lista = new List<Rol>();

            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 3);

            using var dr = await cmd.ExecuteReaderAsync();

            while (await dr.ReadAsync())
            {
                lista.Add(await MapToRol(dr));
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

        private void AddParameters(SqlCommand cmd, Rol r)
        {
            cmd.Parameters.Add("@NombreRol", SqlDbType.NVarChar, 100)
               .Value = r.NombreRol;

            cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar, 255)
               .Value = r.Descripcion;
        }

        private async Task<Rol> MapToRol(SqlDataReader dr)
        {
            return new Rol
            {
                RolID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("RolID")),
                NombreRol = dr["NombreRol"].ToString() ?? string.Empty,
                Descripcion = dr["Descripcion"].ToString() ?? string.Empty
            };
        }
    }
}