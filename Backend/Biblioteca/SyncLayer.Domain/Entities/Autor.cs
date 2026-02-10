using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyncLayer.Domain.Entities
{
    public class Autor
    {
        public int AutorID { get; set; }
        public string PrimerNombre { get; set; }
        public string PrimerApellido { get; set; }
        public string? SegundoApellido { get; set; }
        public string? Nacionalidad { get; set; }
        public int EstadoID { get; set; }


    }
}
