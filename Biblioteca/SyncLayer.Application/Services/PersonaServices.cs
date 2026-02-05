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
        public async Task<IEnumerable<PersonaDTOs>> ListarPersonasAsync()
        {
            var personas = await _repository.ListarPersonasAsync();

            return personas.Select(p => new PersonaDTOs
            {
                PersonaID = p.PersonaID,
                PrimerNombre = p.PrimerNombre,
                SegundoNombre = p.SegundoNombre,
                PrimerApellido = p.PrimerApellido,
                SegundoApellido = p.SegundoApellido,
                DNI = p.DNI,
                Genero = p.Genero,
                FechaNacimiento = p.FechaNacimiento,
                Email = p.Email,
                Telefono = p.Telefono,
                Direccion = p.Direccion,
                TipoPersonaID = p.TipoPersonaID
            });
        }

        public async Task<PersonaDTOs?> ObtenerPersonaPorIdAsync(int personaId)
        {
            var persona = await _repository.ObtenerPersonaPorIdAsync(personaId);

            if (persona == null)
                return null;

            return new PersonaDTOs
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

        public async Task CrearPersonaAsync(PersonaDTOs dto)
        {
            var persona = new Persona
            {
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

            await _repository.CrearPersonaAsync(persona);
        }

        public async Task ActualizarPersonaAsync(int personaId, PersonaDTOs dto)
        {
            var persona = new Persona
            {
                PersonaID = personaId,
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

            await _repository.ActualizarPersonaAsync(persona);
        }
    }
}