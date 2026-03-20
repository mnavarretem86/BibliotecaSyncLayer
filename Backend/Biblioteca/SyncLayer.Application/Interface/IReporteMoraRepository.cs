using SyncLayer.Application.DTOs;

namespace SyncLayer.Application.Interface
{
    public interface IReporteMoraRepository
    {
        Task<List<ReporteMoraDto>> ObtenerReporteMoraAsync();
    }
}