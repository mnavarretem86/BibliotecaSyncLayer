using Microsoft.AspNetCore.Mvc;
using SyncLayer.Application.Services;

namespace SyncLayer.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteMoraController : ControllerBase
    {
        private readonly ReporteMoraService _service;

        public ReporteMoraController(ReporteMoraService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerReporteMora()
        {
            var resultado = await _service.ObtenerReporteAsync();

            return Ok(resultado);
        }
    }
}