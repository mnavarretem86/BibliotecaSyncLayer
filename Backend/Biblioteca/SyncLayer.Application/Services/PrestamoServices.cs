using System.Collections.Generic;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;

namespace SyncLayer.Application.Services
{
    public class PrestamoServices
    {
        private readonly IPrestamoRepository _repository;

        public PrestamoServices(IPrestamoRepository repository)
        {
            _repository = repository;
        }

        // Operación 1 - Crear préstamo
        public async Task<string> CrearPrestamoAsync(CreatePrestamoDTO dto)
        {
            return await _repository.CrearPrestamoAsync(dto);
        }

        // Operación 2 - Devolver préstamo
        public async Task<string> DevolverPrestamoAsync(DevolverPrestamoDTO dto)
        {
            return await _repository.DevolverPrestamoAsync(dto);
        }

        // Operación 3 - Obtener detalle
        public async Task<PrestamoDetalleDTO?> ObtenerPrestamoPorIdAsync(int prestamoId)
        {
            return await _repository.ObtenerPrestamoPorIdAsync(prestamoId);
        }

        // Operación 4 - Listar todos
        public async Task<IEnumerable<PrestamoListDTO>> ListarPrestamosAsync()
        {
            return await _repository.ListarPrestamosAsync();
        }
    }
}