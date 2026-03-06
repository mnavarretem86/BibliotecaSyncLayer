import { useState } from "react";
import { useLibros } from "../../hooks/Libro/useLibros";
import { Plus, Edit2, BookOpen, ArrowLeft, Layers, Boxes, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import LibroCreate from "./LibroCreate";
import LibroEdit from "./LibroEdit";

export default function Libros() {
  const { libros, loading, refetch, search, setSearch, currentPage, setCurrentPage, totalPages } = useLibros();
  const [ui, setUi] = useState({ isCreateOpen: false, isEditOpen: false, selectedId: null });

  const handleEdit = (id) => setUi({ ...ui, isEditOpen: true, selectedId: id });

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 mt-4">
        <div>
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-2 transition-colors group">
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-medium">Gestión Central</span>
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Catálogo de <span className="font-semibold text-blue-600">Libros</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Buscar título o ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-200 rounded-2xl shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] outline-none text-sm w-64 focus:ring-2 ring-blue-500/20 transition-all"
            />
          </div>

          <button
            onClick={() => setUi({ ...ui, isCreateOpen: true })}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 rounded-2xl shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] transition-all font-medium text-sm active:scale-95"
          >
            <Plus size={18} /> Nuevo Libro
          </button>
        </div>
      </header>

      <div className="bg-slate-200 rounded-[2rem] shadow-[8px_8px_16px_#c8d0e7,-8px_-8px_16px_#ffffff] overflow-hidden border border-white/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
              <th className="px-8 py-5">Libro</th>
              <th className="px-6 py-5">Categoría</th>
              <th className="px-6 py-5">Estado</th>
              <th className="px-6 py-5">Stock</th>
              <th className="px-6 py-5">Año</th>
              <th className="px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="py-20 text-center text-[10px] uppercase tracking-widest text-slate-400">Sincronizando...</td></tr>
            ) : libros.length > 0 ? (
              libros.map((l) => (
                <tr key={l.libroID} className="group hover:bg-white/30 transition-colors border-t border-slate-300/50">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] text-slate-500"><BookOpen size={18} /></div>
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-medium">{l.titulo}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-tighter">ISBN: {l.isbn}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600"><div className="flex items-center gap-2"><Layers size={14} className="opacity-50" />{l.nombreCategoria}</div></td>
                  <td className="px-6 py-4 text-slate-600">{l.nombreEstado}</td>
                  <td className="px-6 py-4 text-slate-600"><div className="flex items-center gap-2"><Boxes size={14} className="opacity-50" />{l.stockDisponible} / {l.stockTotal}</div></td>
                  <td className="px-6 py-4 text-slate-600">{l.anioPublicacion}</td>
                  <td className="px-8 py-4 text-right">
                    <button onClick={() => handleEdit(l.libroID)} className="p-2 rounded-xl shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] transition-all hover:text-blue-600">
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="py-10 text-center text-slate-400">No se encontraron resultados</td></tr>
            )}
          </tbody>
        </table>

        {/* Paginación */}
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

      <LibroCreate isOpen={ui.isCreateOpen} onClose={() => setUi({...ui, isCreateOpen: false})} onRefresh={refetch} />
      <LibroEdit isOpen={ui.isEditOpen} onClose={() => setUi({...ui, isEditOpen: false, selectedId: null})} onRefresh={refetch} libroId={ui.selectedId} />
    </div>
  );
}