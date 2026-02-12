using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.Services;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController : ControllerBase
    {
        private readonly EstadoService _service;


        public EstadoController (EstadoService estadoServices)
        {

            _service = estadoServices;
        }

        [HttpGet]
        public async Task<IActionResult> ListarEstado()
        {
            try
            {
                var lista = await _service.GetEstadoListAsync();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
