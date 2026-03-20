using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using SyncLayer.Application.Interface;
using SyncLayer.Application.DTOs;
using SyncLayer.Domain.Entities;
using SyncLayer.Infrastructure.DataBase;

namespace SyncLayer.Infrastructure.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly DBConnectionFactory _dbConnectionFactory;
        private const string StoreProcedure = "USP_Usuario";

        public UsuarioRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task CrearUsuarioAsync(Usuario usuario)
        {
            try
            {
                using var con = _dbConnectionFactory.CreateConnection();
                await con.OpenAsync();

                using var cmd = CreateCommand(con, 1);
                AddParameters(cmd, usuario);

                await cmd.ExecuteNonQueryAsync();
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task ActualizarUsuarioAsync(Usuario usuario)
        {
            try
            {
                using var con = _dbConnectionFactory.CreateConnection();
                await con.OpenAsync();

                using var cmd = CreateCommand(con, 2);
                cmd.Parameters.Add("@UsuarioID", SqlDbType.Int).Value = usuario.UsuarioID;

                AddParameters(cmd, usuario);

                await cmd.ExecuteNonQueryAsync();
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<UsuarioListadoDTO>> ListarUsuariosAsync()
        {
            var lista = new List<UsuarioListadoDTO>();

            try
            {
                using var con = _dbConnectionFactory.CreateConnection();
                await con.OpenAsync();

                using var cmd = CreateCommand(con, 3);

                using var dr = await cmd.ExecuteReaderAsync();

                while (await dr.ReadAsync())
                {
                    lista.Add(await MapToUsuarioListadoDTO(dr));
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }

            return lista;
        }

        public async Task<IEnumerable<Usuario>> ListarUsuariosSinRolAsync()
        {
            var lista = new List<Usuario>();

            try
            {
                using var con = _dbConnectionFactory.CreateConnection();
                await con.OpenAsync();

                using var cmd = CreateCommand(con, 4);

                using var dr = await cmd.ExecuteReaderAsync();

                while (await dr.ReadAsync())
                {
                    lista.Add(await MapToUsuario(dr));
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
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

        private void AddParameters(SqlCommand cmd, Usuario u)
        {
            cmd.Parameters.Add("@PersonaID", SqlDbType.Int).Value = u.PersonaID;
            cmd.Parameters.Add("@Contrasena", SqlDbType.NVarChar, 255).Value =
                string.IsNullOrEmpty(u.Contrasena) ? DBNull.Value : u.Contrasena;

            cmd.Parameters.Add("@EstadoID", SqlDbType.Int).Value = u.EstadoID;
            cmd.Parameters.Add("@RolID", SqlDbType.Int).Value = u.RolID;
        }

        private async Task<UsuarioListadoDTO> MapToUsuarioListadoDTO(SqlDataReader dr)
        {
            return new UsuarioListadoDTO
            {
                UsuarioID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("UsuarioID")),
                PersonaID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("PersonaID")),
                NombrePersona = dr["NombrePersona"].ToString(),
                EstadoID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("EstadoID")),
                NombreEstado = dr["NombreEstado"].ToString(),
                RolID = dr["RolID"] == DBNull.Value ? 0 : Convert.ToInt32(dr["RolID"]),
                NombreRol = dr["NombreRol"]?.ToString() ?? "Sin rol",
                FechaRegistro = await dr.GetFieldValueAsync<DateTime>(dr.GetOrdinal("FechaRegistro"))
            };
        }

        private async Task<Usuario> MapToUsuario(SqlDataReader dr)
        {
            return new Usuario
            {
                UsuarioID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("UsuarioID")),
                PersonaID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("PersonaID")),
                EstadoID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("EstadoID")),
                FechaRegistro = await dr.GetFieldValueAsync<DateTime>(dr.GetOrdinal("FechaRegistro")),
                RolID = dr["RolID"] == DBNull.Value ? 0 : Convert.ToInt32(dr["RolID"]),
                Contrasena = string.Empty
            };
        }
    }
}