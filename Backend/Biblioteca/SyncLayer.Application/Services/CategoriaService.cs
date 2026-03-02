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
    public class CategoriaService
    {
        private readonly ICategoriaRepository _repository;

        public CategoriaService(ICategoriaRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<CategoriaDTOs>> GetCategoriasAsync()
        {
            var categorias = await _repository.ListarCategoriasAsync();
            return categorias.Select(MapToDTO).ToList();
        }
  
        public async Task CrearCategoriaAsync(CategoriaDTOs dto)
        {
            var categoria = MapToEntity(dto);
            await _repository.CrearCategoriaAsync(categoria);
        }

        public async Task ActualizarCategoriaAsync(CategoriaDTOs dto)
        {
            var categoria = MapToEntity(dto);
            await _repository.ActualizarCategoriaAsync(categoria);
        }


        private Categoria MapToEntity(CategoriaDTOs dto)
        {
            return new Categoria
            {
                CategoriaID = dto.CategoriaID,
                NombreCategoria = dto.NombreCategoria
            };
        }


        private CategoriaDTOs MapToDTO(Categoria categoria)
        {
            return new CategoriaDTOs
            {
                CategoriaID = categoria.CategoriaID,
                NombreCategoria = categoria.NombreCategoria
            };
        }
    }
}