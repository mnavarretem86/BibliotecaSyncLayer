using System.Collections.Generic;
using System.Threading.Tasks;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.DTOs;

namespace SyncLayer.Application.Interface
{
    public interface IPrestamoRepository
    {
        // Operación 1 - Crear préstamo
        Task<string> CrearPrestamoAsync(CreatePrestamoDTO dto);

        // Operación 2 - Devolver préstamo
        Task<string> DevolverPrestamoAsync(DevolverPrestamoDTO dto);

        // Operación 3 - Obtener detalle por ID
        Task<PrestamoDetalleDTO?> ObtenerPrestamoPorIdAsync(int prestamoId);

        // Operación 4 - Listar todos
        Task<IEnumerable<PrestamoListDTO>> ListarPrestamosAsync();
    }
}