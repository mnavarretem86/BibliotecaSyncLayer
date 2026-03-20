using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncLayer.Application.DTOs
{
    public class ReporteMoraDto
    {
        public string NombrePersona { get; set; }
        public string Libro { get; set; }
        public DateTime FechaPrestamo { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public int DiasMora { get; set; }
        public decimal? MontoAdeudado { get; set; }


    }
}
