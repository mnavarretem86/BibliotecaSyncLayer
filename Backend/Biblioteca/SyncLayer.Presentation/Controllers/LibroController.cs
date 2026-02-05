using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.Services;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private readonly LibroServices _services;

        public LibroController(LibroServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> ListarLibros()
        {
            try
            {
                var lista = await _services.ListarLibrosAsync();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


    }
}
