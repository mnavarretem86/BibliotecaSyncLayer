using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Infrastructure.DataBase;

namespace SyncLayer.Infrastructure.Repository
{
    public class PrestamoRepository : IPrestamoRepository
    {
        private readonly DBConnectionFactory _dbConnectionFactory;
        private const string StoreProcedure = "USP_Prestamo";

        public PrestamoRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        // ================================
        // Operación 1 - Crear préstamo
        // ================================
        public async Task<string> CrearPrestamoAsync(CreatePrestamoDTO dto)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 1);

            cmd.Parameters.Add("@LibroID", SqlDbType.Int).Value = dto.LibroID;
            cmd.Parameters.Add("@UsuarioID", SqlDbType.Int).Value = dto.UsuarioID;

            using var dr = await cmd.ExecuteReaderAsync();

            if (await dr.ReadAsync())
                return dr["Mensaje"]?.ToString() ?? string.Empty;

            return string.Empty;
        }

        // ================================
        // Operación 2 - Devolver préstamo
        // ================================
        public async Task<string> DevolverPrestamoAsync(DevolverPrestamoDTO dto)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 2);

            cmd.Parameters.Add("@PrestamoID", SqlDbType.Int).Value = dto.PrestamoID;
            cmd.Parameters.Add("@Observaciones", SqlDbType.NVarChar)
                .Value = (object?)dto.Observaciones ?? DBNull.Value;

            using var dr = await cmd.ExecuteReaderAsync();

            if (await dr.ReadAsync())
                return dr["Mensaje"]?.ToString() ?? string.Empty;

            return string.Empty;
        }

        // ================================
        // Operación 3 - Obtener por ID
        // ================================
        public async Task<PrestamoDetalleDTO?> ObtenerPrestamoPorIdAsync(int prestamoId)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 3);
            cmd.Parameters.Add("@PrestamoID", SqlDbType.Int).Value = prestamoId;

            using var dr = await cmd.ExecuteReaderAsync();

            if (await dr.ReadAsync())
            {
                return new PrestamoDetalleDTO
                {
                    PrestamoID = dr.GetInt32(dr.GetOrdinal("PrestamoID")),
                    Titulo = dr["Titulo"]?.ToString() ?? string.Empty,
                    FechaPrestamo = dr.GetDateTime(dr.GetOrdinal("FechaPrestamo")),
                    FechaVencimiento = dr.GetDateTime(dr.GetOrdinal("FechaVencimiento")),
                    NombreEstado = dr["NombreEstado"]?.ToString() ?? string.Empty
                };
            }

            return null;
        }

        // ================================
        // Operación 4 - Listar todos
        // ================================
        public async Task<IEnumerable<PrestamoListDTO>> ListarPrestamosAsync()
        {
            var lista = new List<PrestamoListDTO>();

            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 4);

            using var dr = await cmd.ExecuteReaderAsync();

            while (await dr.ReadAsync())
            {
                lista.Add(new PrestamoListDTO
                {
                    PrestamoID = dr.GetInt32(dr.GetOrdinal("PrestamoID")),
                    Titulo = dr["Titulo"]?.ToString() ?? string.Empty,
                    Usuario = dr["Usuario"]?.ToString() ?? string.Empty,
                    FechaPrestamo = dr.GetDateTime(dr.GetOrdinal("FechaPrestamo")),
                    FechaVencimiento = dr.GetDateTime(dr.GetOrdinal("FechaVencimiento")),
                    NombreEstado = dr["NombreEstado"]?.ToString() ?? string.Empty
                });
            }

            return lista;
        }

        // ================================
        // Método base para SP
        // ================================
        private SqlCommand CreateCommand(SqlConnection con, int operacion)
        {
            var cmd = new SqlCommand(StoreProcedure, con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@Operacion", SqlDbType.Int).Value = operacion;
            return cmd;
        }
    }
}