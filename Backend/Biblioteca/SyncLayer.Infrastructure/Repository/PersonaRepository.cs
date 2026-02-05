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
    public class PersonaRepository : IPersonaRepository
    {
        private readonly DBConnectionFactory _dbConnectionFactory;
        private const string StoreProcedure = "USP_Persona";

        public PersonaRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task CrearPersonaAsync(Persona persona)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();
            using var cmd = CreateCommand(con, 1); 
            AddParameters(cmd, persona);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task ActualizarPersonaAsync(Persona persona)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();
            using var cmd = CreateCommand(con, 2); 
            cmd.Parameters.Add("@PersonaID", SqlDbType.Int).Value = persona.PersonaID;
            AddParameters(cmd, persona);

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<Persona?> ObtenerPersonaPorIdAsync(int personaId)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();
            using var cmd = CreateCommand(con, 3); 
            cmd.Parameters.Add("@PersonaID", SqlDbType.Int).Value = personaId;

            using var dr = await cmd.ExecuteReaderAsync();
            if (await dr.ReadAsync())
            {
                return await MapToPersona(dr);
            }
            return null;
        }

        public async Task<IEnumerable<Persona>> ListarPersonasAsync()
        {
            var lista = new List<Persona>();
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();
            using var cmd = CreateCommand(con, 4); 

            using var dr = await cmd.ExecuteReaderAsync();
            while (await dr.ReadAsync())
            {
                lista.Add(await MapToPersona(dr));
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


        private void AddParameters(SqlCommand cmd, Persona p)
        {
            cmd.Parameters.Add("@PrimerNombre", SqlDbType.NVarChar, 100).Value = p.PrimerNombre;
            cmd.Parameters.Add("@SegundoNombre", SqlDbType.NVarChar, 100).Value = (object?)p.SegundoNombre ?? DBNull.Value;
            cmd.Parameters.Add("@PrimerApellido", SqlDbType.NVarChar, 100).Value = p.PrimerApellido;
            cmd.Parameters.Add("@SegundoApellido", SqlDbType.NVarChar, 100).Value = (object?)p.SegundoApellido ?? DBNull.Value;
            cmd.Parameters.Add("@DNI", SqlDbType.VarChar, 20).Value = p.DNI;
            cmd.Parameters.Add("@Genero", SqlDbType.Char, 1).Value = (object?)p.Genero ?? DBNull.Value;
            cmd.Parameters.Add("@FechaNacimiento", SqlDbType.DateTime).Value = p.FechaNacimiento;
            cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 100).Value = p.Email;
            cmd.Parameters.Add("@Telefono", SqlDbType.VarChar, 20).Value = (object?)p.Telefono ?? DBNull.Value;
            cmd.Parameters.Add("@Direccion", SqlDbType.NVarChar, 255).Value = (object?)p.Direccion ?? DBNull.Value;
            cmd.Parameters.Add("@TipoPersonaID", SqlDbType.Int).Value = p.TipoPersonaID;
        }



        private async Task<Persona> MapToPersona(SqlDataReader dr)
        {
            return new Persona
            {
                PersonaID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("PersonaID")),
                PrimerNombre = dr["PrimerNombre"].ToString() ?? string.Empty,
                SegundoNombre = dr["SegundoNombre"] as string,
                PrimerApellido = dr["PrimerApellido"].ToString() ?? string.Empty,
                SegundoApellido = dr["SegundoApellido"] as string,
                DNI = dr["DNI"].ToString() ?? string.Empty,
                Genero = dr["Genero"] as string,
                FechaNacimiento = await dr.GetFieldValueAsync<DateTime>(dr.GetOrdinal("FechaNacimiento")),
                Email = dr["Email"].ToString() ?? string.Empty,
                Telefono = dr["Telefono"] as string,
                Direccion = dr["Direccion"] as string,
                TipoPersonaID = await dr.GetFieldValueAsync<int>(dr.GetOrdinal("TipoPersonaID"))
            };
        }
    }
}