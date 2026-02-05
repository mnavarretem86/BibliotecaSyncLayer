using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SyncLayer.Domain.Entities;

namespace SyncLayer.Application.Interface
{
    public interface IPersonaRepository
    {

        //Opcion 1 (Insertart)
        Task CrearPersonaAsync(Persona persona );

        //Opcion 2 Actualizar Persona
        Task ActualizarPersonaAsync(Persona persona);
        
        //Opcion 3 Obtener Persona por ID
        Task <Persona?> ObtenerPersonaPorIdAsync(int personaId);       

        //Opcion 4 obtener Lista de personas

        Task<IEnumerable<Persona>> ListarPersonasAsync();

    }
}
