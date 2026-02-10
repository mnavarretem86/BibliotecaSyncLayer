import { useAutores } from "../hooks/useAutores";
import { Plus, Edit2, Globe, User, ArrowLeft, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function Autores() {
  const { autores, loading } = useAutores();

  const getEstadoBadge = (id) => (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
      id === 4 ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
    }`}>
      {id === 4 ? "Activo" : "Inactivo"}
    </span>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 mt-4">
        <div>
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-blue-600 mb-2 transition-colors group">
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-medium uppercase tracking-widest text-[10px]">Gestión Central</span>
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-slate-950">
            Catálogo de <span className="font-semibold text-blue-600">Autores</span>
          </h1>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-sm font-medium text-sm">
          <Plus size={18} />
          Nuevo Autor
        </button>
      </header>

      {/* Tabla Soft UI */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">Autor</th>
                <th className="px-6 py-5 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">Nacionalidad</th>
                <th className="px-6 py-5 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 text-center">Estado</th>
                <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 text-right">Acciones</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20">
                    <div className="flex flex-col items-center justify-center text-slate-300 gap-3">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-[10px] uppercase tracking-widest font-semibold">Consultando API UDEM...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                autores.map((autor) => (
                  <tr key={autor.autorID} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <User size={18} />
                        </div>
                        <span className="font-medium text-slate-700">
                          {autor.primerNombre} {autor.primerApellido}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Globe size={14} className="text-slate-300" />
                        {autor.nacionalidad}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getEstadoBadge(autor.estadoID)}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {!loading && (
        <p className="mt-6 text-[10px] text-slate-400 text-right uppercase tracking-widest font-medium">
          Total: {autores.length} autores registrados
        </p>
      )}
    </div>
  );
}