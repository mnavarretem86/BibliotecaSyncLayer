using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncLayer.Application.DTOs
{
    public class PrestamoListDTO
    {

        public int PrestamoID { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Usuario { get; set; } = string.Empty;
        public DateTime FechaPrestamo { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public string NombreEstado { get; set; } = string.Empty;
    }
}
