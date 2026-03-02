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
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly DBConnectionFactory _dbConnectionFactory;
        private const string StoreProcedure = "USP_Categoria";

        public CategoriaRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }


        public async Task CrearCategoriaAsync(Categoria categoria)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 1);
            AddParameters(cmd, categoria);

            await cmd.ExecuteNonQueryAsync();
        }


        public async Task ActualizarCategoriaAsync(Categoria categoria)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 2);
            cmd.Parameters.Add("@CategoriaID", SqlDbType.Int).Value = categoria.CategoriaID;

            AddParameters(cmd, categoria);

            await cmd.ExecuteNonQueryAsync();
        }


        public async Task<IEnumerable<Categoria>> ListarCategoriasAsync()
        {
            var lista = new List<Categoria>();

            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using var cmd = CreateCommand(con, 3);

            using var dr = await cmd.ExecuteReaderAsync();

            while (await dr.ReadAsync())
            {
                lista.Add(await MapToCategoria(dr));
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


        private void AddParameters(SqlCommand cmd, Categoria c)
        {
            cmd.Parameters.Add("@NombreCategoria", SqlDbType.NVarChar, 100)
               .Value = c.NombreCategoria;
        }

        private async Task<Categoria> MapToCategoria(SqlDataReader dr)
        {
            return new Categoria
            {
                CategoriaID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("CategoriaID")),
                NombreCategoria = dr["NombreCategoria"].ToString() ?? string.Empty
            };
        }
    }
}