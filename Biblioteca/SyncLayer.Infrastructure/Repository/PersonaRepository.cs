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

        public PersonaRepository(DBConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }


 
        public async Task CrearPersonaAsync(Persona persona)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("USP_Persona", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Operacion", 1);
                cmd.Parameters.AddWithValue("@PrimerNombre", persona.PrimerNombre);
                cmd.Parameters.AddWithValue("@SegundoNombre", (object?)persona.SegundoNombre ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@PrimerApellido", persona.PrimerApellido);
                cmd.Parameters.AddWithValue("@SegundoApellido", (object?)persona.SegundoApellido ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@DNI", persona.DNI);
                cmd.Parameters.AddWithValue("@Genero", (object?)persona.Genero ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@FechaNacimiento", persona.FechaNacimiento);
                cmd.Parameters.AddWithValue("@Email", persona.Email);
                cmd.Parameters.AddWithValue("@Telefono", (object?)persona.Telefono ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@Direccion", (object?)persona.Direccion ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@TipoPersonaID", persona.TipoPersonaID);

                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task ActualizarPersonaAsync(Persona persona)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("USP_Persona", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Operacion", 2);
                cmd.Parameters.AddWithValue("@PersonaID", persona.PersonaID);
                cmd.Parameters.AddWithValue("@PrimerNombre", (object?)persona.PrimerNombre ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@SegundoNombre", (object?)persona.SegundoNombre ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@PrimerApellido", (object?)persona.PrimerApellido ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@SegundoApellido", (object?)persona.SegundoApellido ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@Genero", (object?)persona.Genero ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@FechaNacimiento", persona.FechaNacimiento);
                cmd.Parameters.AddWithValue("@Email", (object?)persona.Email ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@Telefono", (object?)persona.Telefono ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@Direccion", (object?)persona.Direccion ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@TipoPersonaID", persona.TipoPersonaID);

                await cmd.ExecuteNonQueryAsync();
            }
        }
        public async Task<Persona?> ObtenerPersonaPorIdAsync(int personaId)
        {
            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("USP_Persona", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Operacion", 3);
                cmd.Parameters.AddWithValue("@PersonaID", personaId);

                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    if (await dr.ReadAsync())
                    {
                        return new Persona
                        {
                            PersonaID = Convert.ToInt32(dr["PersonaID"]),
                            PrimerNombre = dr["PrimerNombre"].ToString(),
                            SegundoNombre = dr["SegundoNombre"]?.ToString(),
                            PrimerApellido = dr["PrimerApellido"].ToString(),
                            SegundoApellido = dr["SegundoApellido"]?.ToString(),
                            DNI = dr["DNI"].ToString(),
                            Genero = dr["Genero"]?.ToString(),
                            FechaNacimiento = Convert.ToDateTime(dr["FechaNacimiento"]),
                            Email = dr["Email"].ToString(),
                            Telefono = dr["Telefono"]?.ToString(),
                            Direccion = dr["Direccion"]?.ToString(),
                            TipoPersonaID = Convert.ToInt32(dr["TipoPersonaID"])
                        };
                    }
                }
            }

            return null;
        }


  
        public async Task<IEnumerable<Persona>> ListarPersonasAsync()
        {
            var lista = new List<Persona>();

            using var con = _dbConnectionFactory.CreateConnection();
            await con.OpenAsync();

            using (SqlCommand cmd = new SqlCommand("USP_Persona", con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Operacion", 4);

                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        lista.Add(new Persona
                        {
                            PersonaID = Convert.ToInt32(dr["PersonaID"]),
                            PrimerNombre = dr["PrimerNombre"].ToString(),
                            SegundoNombre = dr["SegundoNombre"]?.ToString(),
                            PrimerApellido = dr["PrimerApellido"].ToString(),
                            SegundoApellido = dr["SegundoApellido"]?.ToString(),
                            DNI = dr["DNI"].ToString(),
                            Genero = dr["Genero"]?.ToString(),
                            FechaNacimiento = Convert.ToDateTime(dr["FechaNacimiento"]),
                            Email = dr["Email"].ToString(),
                            Telefono = dr["Telefono"]?.ToString(),
                            Direccion = dr["Direccion"]?.ToString(),
                            TipoPersonaID = Convert.ToInt32(dr["TipoPersonaID"])
                        });
                    }
                }
            }

            return lista;
        }
    }
}
