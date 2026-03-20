using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncLayer.Domain.Entities
{
    public class Prestamo
    {

        public int PrestamoID { get; set; }

        public int LibroID { get; set; }

        public int UsuarioID { get; set; }

        public DateTime FechaPrestamo { get; set; }

        public DateTime FechaVencimiento { get; set; }

        public int EstadoID { get; set; }
    }
}