using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;
using SyncLayer.Infrastructure.DataBase;


namespace SyncLayer.Infrastructure.Repository
{
    public class LibroRepository : ILibroRepository
    {

        private readonly DBConnectionFactory _dBConnectionFactory;
        private const string StoreProcedure = "USP_Libro";




        public LibroRepository(DBConnectionFactory dbConnectionFactory)

        {
            _dBConnectionFactory = dbConnectionFactory;
        }

        public Task CrearLibroAsync(Libro libro)
        {
            throw new NotImplementedException();
        }

        public Task ActualizarLibroAsync(Libro libro)
        {
            throw new NotImplementedException();
        }

        public Task<Libro?> ObtenerLibroPorIdAsync(int libroId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Libro>> ListarLibrosAsync()
        {
            var lista = new List<Libro>();
            using var con = _dBConnectionFactory.CreateConnection();
            await con.OpenAsync();
            using var cmd = CreateCommand(con, 4);

            using var dr = await cmd.ExecuteReaderAsync();
            while (await dr.ReadAsync())
            {
                lista.Add(await MapToLibro(dr));
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

        private void AddParameters(SqlCommand cmd, Libro l)
        {
            cmd.Parameters.Add("@LibroID", SqlDbType.Int).Value = (object?)l.LibroID ?? DBNull.Value;
            cmd.Parameters.Add("@Titulo", SqlDbType.NVarChar, 255).Value = l.Titulo;
            cmd.Parameters.Add("@ISBN", SqlDbType.VarChar, 20).Value = l.ISBN;
            cmd.Parameters.Add("@AnioPublicacion", SqlDbType.Int).Value = (object?)l.AnioPublicacion ?? DBNull.Value;
            cmd.Parameters.Add("@CategoriaID", SqlDbType.Int).Value = l.CategoriaID; 
            cmd.Parameters.Add("@EstadoID", SqlDbType.Int).Value = (object?)l.EstadoID ?? DBNull.Value;
            cmd.Parameters.Add("@StockTotal", SqlDbType.Int).Value =(object?)l.StockTotal ?? DBNull.Value;
        }


        private async Task<Libro> MapToLibro(SqlDataReader dr)
        {
            return new Libro
            {
                LibroID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("LibroID")),
                Titulo = dr["Titulo"]?.ToString() ?? string.Empty,
                ISBN = dr["ISBN"]?.ToString() ?? string.Empty,
                AnioPublicacion = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("AnioPublicacion")),
                NombreCategoria = dr["NombreCategoria"]?.ToString() ?? string.Empty,
                NombreEstado = dr["NombreEstado"]?.ToString() ?? string.Empty,
                StockTotal = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("StockTotal")),
                StockDisponible = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("StockDisponible"))
            };
        }
    }
}
