using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Services
{
    public class PersonaServices
    {
        private readonly IPersonaRepository _repository;

        public PersonaServices(IPersonaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PersonaDTO>> ListarPersonasAsync()
        {
            var personas = await _repository.ListarPersonasAsync();

            return personas.Select(MapToDTO).ToList();
        }

        public async Task<PersonaDTO?> ObtenerPersonaPorIdAsync(int personaId)
        {
            var persona = await _repository.ObtenerPersonaPorIdAsync(personaId);

            if (persona == null)
                return null;

            return MapToDTO(persona);
        }


        public async Task CrearPersonaAsync(PersonaDTO dto)
        {
            var persona = MapToEntity(dto);

            await _repository.CrearPersonaAsync(persona);
        }

        public async Task ActualizarPersonaAsync(PersonaDTO dto)
        {
            var persona = MapToEntity(dto);

            await _repository.ActualizarPersonaAsync(persona);
        }
        private PersonaDTO MapToDTO(Persona persona)
        {
            return new PersonaDTO
            {
                PersonaID = persona.PersonaID,
                PrimerNombre = persona.PrimerNombre,
                SegundoNombre = persona.SegundoNombre,
                PrimerApellido = persona.PrimerApellido,
                SegundoApellido = persona.SegundoApellido,
                DNI = persona.DNI,
                Genero = persona.Genero,
                FechaNacimiento = persona.FechaNacimiento,
                Email = persona.Email,
                Telefono = persona.Telefono,
                Direccion = persona.Direccion,
                TipoPersonaID = persona.TipoPersonaID
            };
        }
        private Persona MapToEntity(PersonaDTO dto)
        {
            return new Persona
            {
                PersonaID = dto.PersonaID,
                PrimerNombre = dto.PrimerNombre,
                SegundoNombre = dto.SegundoNombre,
                PrimerApellido = dto.PrimerApellido,
                SegundoApellido = dto.SegundoApellido,
                DNI = dto.DNI,
                Genero = dto.Genero,
                FechaNacimiento = dto.FechaNacimiento,
                Email = dto.Email,
                Telefono = dto.Telefono,
                Direccion = dto.Direccion,
                TipoPersonaID = dto.TipoPersonaID
            };
        }
    }
}