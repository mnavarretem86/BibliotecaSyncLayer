using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncLayer.Domain.Entities
{
    public class Estado
    {
        public int EstadoID { get; set; }

        public string NombreEstado { get; set; } = string.Empty;

        public string TipoEstado { get; set; } = string.Empty;

    }
}
