import { useState } from "react";
import { usePersonas } from "../../hooks/Persona/usePersonas";
import { 
  Plus, Edit2, Mail, Contact, ArrowLeft, Fingerprint, 
  UserCircle, Search, ChevronLeft, ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import PersonaCreate from "./PersonaCreate";
import PersonaEdit from "./PersonaEdit";

export default function Personas() {
  const { 
    personas, loading, refetch, search, setSearch, 
    currentPage, setCurrentPage, totalPages 
  } = usePersonas();
  
  const [ui, setUi] = useState({ isCreateOpen: false, isEditOpen: false, selectedId: null });

  const handleEdit = (id) => setUi({ ...ui, isEditOpen: true, selectedId: id });

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 mt-4">
        <div>
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-2 transition-colors group">
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-medium uppercase tracking-widest">Gestión Central</span>
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Catálogo de <span className="font-semibold text-blue-600">Personas</span>
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Buscar por DNI o nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-200 rounded-2xl shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] outline-none text-sm w-64 focus:ring-2 ring-blue-500/20 transition-all"
            />
          </div>

          <button 
            onClick={() => setUi({ ...ui, isCreateOpen: true })}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 rounded-2xl shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] transition-all font-medium text-sm active:scale-95"
          >
            <Plus size={18} /> Nueva Persona
          </button>
        </div>
      </header>

      <div className="bg-slate-200 rounded-[2rem] shadow-[8px_8px_16px_#c8d0e7,-8px_-8px_16px_#ffffff] overflow-hidden border border-white/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
              <th className="px-8 py-5">Identificación</th>
              <th className="px-6 py-5">Nombre Completo</th>
              <th className="px-6 py-5">Perfil / Tipo</th>
              <th className="px-6 py-5">Contacto</th>
              <th className="px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="py-20 text-center text-[10px] uppercase tracking-widest text-slate-400">Sincronizando...</td></tr>
            ) : personas.length > 0 ? (
              personas.map((p) => (
                <tr key={p.personaID} className="group hover:bg-white/30 transition-colors border-t border-slate-300/50">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] text-slate-500">
                        <Fingerprint size={18} />
                      </div>
                      <span className="font-medium text-slate-700">{p.dni}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-700 font-medium">{p.primerNombre} {p.primerApellido}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-tighter">ID: {p.personaID}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-200 text-[11px] font-bold text-blue-600 uppercase tracking-wider shadow-[2px_2px_4px_#c8d0e7,-2px_-2px_4px_#ffffff]">
                      <UserCircle size={12} />
                      {p.nombreTipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm italic">
                    <div className="flex items-center gap-2"><Mail size={14} className="opacity-50" /> {p.email}</div>
                    <div className="flex items-center gap-2"><Contact size={14} className="opacity-50" /> {p.telefono}</div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button 
                      onClick={() => handleEdit(p.personaID)}
                      className="p-2 rounded-xl shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] transition-all hover:text-blue-600"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="py-10 text-center text-slate-400">No se encontraron personas</td></tr>
            )}
          </tbody>
        </table>

        {/* Paginación Neumórfica */}
        <div className="px-8 py-4 bg-slate-300/30 flex justify-between items-center border-t border-slate-300/50">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Página {currentPage} de {totalPages || 1}</span>
          <div className="flex gap-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-lg shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] disabled:opacity-30 active:scale-95 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] disabled:opacity-30 active:scale-95 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <PersonaCreate isOpen={ui.isCreateOpen} onClose={() => setUi({...ui, isCreateOpen: false})} onRefresh={refetch} />
      <PersonaEdit isOpen={ui.isEditOpen} onClose={() => setUi({...ui, isEditOpen: false, selectedId: null})} onRefresh={refetch} personaId={ui.selectedId} />
    </div>
  );
}