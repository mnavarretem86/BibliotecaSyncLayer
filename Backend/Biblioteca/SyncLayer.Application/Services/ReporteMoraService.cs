using SyncLayer.Application.DTOs;
using SyncLayer.Application.Interface;

namespace SyncLayer.Application.Services
{
    public class ReporteMoraService
    {
        private readonly IReporteMoraRepository _repository;

        public ReporteMoraService(IReporteMoraRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ReporteMoraDto>> ObtenerReporteAsync()
        {
            return await _repository.ObtenerReporteMoraAsync();
        }
    }
}