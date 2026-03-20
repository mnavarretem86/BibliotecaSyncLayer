import { useState } from "react";
import { usePrestamos } from "../../hooks/Prestamo/usePrestamos";
import { useDevolverPrestamo } from "../../hooks/Prestamo/useDevolverPrestamo";
import {
  Plus,
  ArrowLeft,
  BookOpen,
  CalendarDays,
  UserCircle2,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import PrestamoCreate from "./PrestamoCreate";
import PrestamoDevolverModal from "../../components/PrestamoDevolverModal";

export default function Prestamos() {
  const { 
    prestamos, loading, refetch, 
    search, setSearch, 
    currentPage, setCurrentPage, totalPages 
  } = usePrestamos();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDevolverOpen, setIsDevolverOpen] = useState(false);
  const [selectedPrestamoId, setSelectedPrestamoId] = useState(null);

  const openDevolverModal = (prestamoId) => {
    setSelectedPrestamoId(prestamoId);
    setIsDevolverOpen(true);
  };

  const closeDevolverModal = () => {
    setSelectedPrestamoId(null);
    setIsDevolverOpen(false);
  };

  const { handleDevolver, loading: devolviendo } = useDevolverPrestamo(refetch, closeDevolverModal);

  const puedeDevolver = (prestamo) =>
    ["VIGENTE", "EN MORA"].includes(prestamo.nombreEstado?.toUpperCase());

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 mt-4">
        <div>
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-2 transition-colors group">
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-medium uppercase tracking-widest">Gestión Central</span>
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Gestión de <span className="font-semibold text-blue-600">Préstamos</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Input de Búsqueda Neumórfico */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Buscar libro o usuario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-200 rounded-2xl shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] outline-none text-sm w-64 focus:ring-2 ring-blue-500/20 transition-all"
            />
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 rounded-2xl shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] transition-all font-medium text-sm active:scale-95"
          >
            <Plus size={18} /> Nuevo Préstamo
          </button>
        </div>
      </header>

      <div className="bg-slate-200 rounded-[2rem] shadow-[8px_8px_16px_#c8d0e7,-8px_-8px_16px_#ffffff] overflow-hidden border border-white/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
              <th className="px-8 py-5">Libro</th>
              <th className="px-6 py-5">Usuario</th>
              <th className="px-6 py-5">Fecha Préstamo</th>
              <th className="px-6 py-5">Vencimiento</th>
              <th className="px-6 py-5">Estado</th>
              <th className="px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="py-20 text-center text-[10px] uppercase tracking-widest text-slate-400">Sincronizando...</td></tr>
            ) : prestamos.length === 0 ? (
              <tr><td colSpan="6" className="py-20 text-center text-[10px] uppercase tracking-widest text-slate-400">No se encontraron registros</td></tr>
            ) : (
              prestamos.map((p) => (
                <tr key={p.prestamoID} className="group hover:bg-white/30 transition-colors border-t border-slate-300/50">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] text-slate-500">
                        <BookOpen size={18} />
                      </div>
                      <span className="font-medium text-slate-700">{p.titulo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <UserCircle2 size={16} className="opacity-60" />
                      {p.usuario}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="opacity-50" />
                      {new Date(p.fechaPrestamo).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{new Date(p.fechaVencimiento).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-[2px_2px_4px_#c8d0e7,-2px_-2px_4px_#ffffff] ${
                      p.nombreEstado?.toUpperCase() === "VIGENTE" ? "text-blue-600" : 
                      p.nombreEstado?.toUpperCase() === "EN MORA" ? "text-red-600" : "text-green-600"
                    }`}>
                      {p.nombreEstado}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    {puedeDevolver(p) && (
                      <button
                        onClick={() => openDevolverModal(p.prestamoID)}
                        disabled={devolviendo}
                        className="px-5 py-2 rounded-2xl bg-slate-200 shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff] transition-all active:scale-95 text-green-600 font-medium text-sm disabled:opacity-50"
                      >
                        Devolver
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="px-8 py-4 bg-slate-300/30 flex justify-between items-center border-t border-slate-300/50">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            Página {currentPage} de {totalPages || 1}
          </span>
          <div className="flex gap-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-lg shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] disabled:opacity-30 active:scale-95 transition-all text-slate-600"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg shadow-[4px_4px_8px_#c8d0e7,-4px_-4px_8px_#ffffff] disabled:opacity-30 active:scale-95 transition-all text-slate-600"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <PrestamoCreate isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onRefresh={refetch} />
      <PrestamoDevolverModal 
        isOpen={isDevolverOpen} 
        prestamoId={selectedPrestamoId} 
        onClose={closeDevolverModal} 
        onConfirm={handleDevolver} 
        loading={devolviendo} 
      />
    </div>
  );
}