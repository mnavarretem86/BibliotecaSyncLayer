using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Services
{
    public class AutorServices
    {
        private readonly IAutorRepository _repository;

        public AutorServices(IAutorRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<AutorDTOs>> ListarAutoresAsync()
        {
            var autores = await _repository.ListarAutorAsync();

            return autores.Select(a => new AutorDTOs
            {
                AutorID = a.AutorID,
                PrimerNombre = a.PrimerNombre,
                PrimerApellido = a.PrimerApellido,
                SegundoApellido = a.SegundoApellido,
                Nacionalidad = a.Nacionalidad,
                EstadoID = a.EstadoID
            });
        }

        public async Task<AutorDTOs?> ObtenerAutorPorIdAsync(int autorId)
        {
            var autor = await _repository.ObtenerAutorPorIdAsync(autorId);

            if (autor == null)
                return null;

            return new AutorDTOs
            {
                AutorID = autor.AutorID,
                PrimerNombre = autor.PrimerNombre,
                PrimerApellido = autor.PrimerApellido,
                SegundoApellido = autor.SegundoApellido,
                Nacionalidad = autor.Nacionalidad,
                EstadoID = autor.EstadoID
            };
        }

        public async Task CrearAutorAsync(AutorDTOs dto)
        {
            var autor = new Autor
            {
                PrimerNombre = dto.PrimerNombre,
                PrimerApellido = dto.PrimerApellido,
                SegundoApellido = dto.SegundoApellido,
                Nacionalidad = dto.Nacionalidad,
                EstadoID = dto.EstadoID
            };

            await _repository.CrearAutorAsync(autor);
        }

        public async Task ActualizarAutorAsync(int autorId, AutorDTOs dto)
        {
            var autor = new Autor
            {
                AutorID = autorId,
                PrimerNombre = dto.PrimerNombre,
                PrimerApellido = dto.PrimerApellido,
                SegundoApellido = dto.SegundoApellido,
                Nacionalidad = dto.Nacionalidad,
                EstadoID = dto.EstadoID
            };

            await _repository.ActualizarAutorAsync(autor);
        }
    }
}
