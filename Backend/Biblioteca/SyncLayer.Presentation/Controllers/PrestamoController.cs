using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.DTOs;
using SyncLayer.Application.Services;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamoController : ControllerBase
    {
        private readonly PrestamoServices _services;

        public PrestamoController(PrestamoServices services)
        {
            _services = services;
        }

        // ==========================
        // GET: api/Prestamo
        // Operación 4 - Listar todos
        // ==========================
        [HttpGet]
        public async Task<IActionResult> ListarPrestamos()
        {
            try
            {
                var lista = await _services.ListarPrestamosAsync();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // ==========================
        // GET: api/Prestamo/{id}
        // Operación 3 - Obtener por ID
        // ==========================
        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerPorId(int id)
        {
            try
            {
                var prestamo = await _services.ObtenerPrestamoPorIdAsync(id);

                if (prestamo == null)
                    return NotFound("Préstamo no encontrado");

                return Ok(prestamo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ==========================
        // POST: api/Prestamo
        // Operación 1 - Crear
        // ==========================
        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] CreatePrestamoDTO dto)
        {
            try
            {
                var mensaje = await _services.CrearPrestamoAsync(dto);
                return Ok(mensaje);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ==========================
        // PUT: api/Prestamo/devolver
        // Operación 2 - Devolver
        // ==========================
        [HttpPut("devolver")]
        public async Task<IActionResult> Devolver([FromBody] DevolverPrestamoDTO dto)
        {
            try
            {
                var mensaje = await _services.DevolverPrestamoAsync(dto);
                return Ok(mensaje);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}