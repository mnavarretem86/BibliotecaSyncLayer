import { useReporteMora } from "../hooks/ReporteMora/useReporteMora";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Mora() {
  const { moras, loading } = useReporteMora();

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 mt-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-2 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-medium uppercase tracking-widest text-[10px]">
              Gestión Central
            </span>
          </Link>

          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Reporte de <span className="font-semibold text-red-600">Mora</span>
          </h1>
        </div>
      </header>

      <div className="bg-slate-200 rounded-[2rem] shadow-[8px_8px_16px_#c8d0e7,-8px_-8px_16px_#ffffff] overflow-hidden border border-white/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
              <th className="px-6 py-5">Persona</th>
              <th className="px-6 py-5">Libro</th>
              <th className="px-6 py-5">Fecha Préstamo</th>
              <th className="px-6 py-5">Fecha Vencimiento</th>
              <th className="px-6 py-5">Días Mora</th>
              <th className="px-6 py-5 text-right">Monto</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-20 text-center text-xs uppercase tracking-widest text-slate-400">
                  Sincronizando...
                </td>
              </tr>
            ) : moras.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-20 text-center text-xs uppercase tracking-widest text-slate-400">
                  No hay préstamos en mora
                </td>
              </tr>
            ) : (
              moras.map((m, index) => (
                <tr key={index} className="hover:bg-white/40 transition-colors align-middle">
                  <td className="px-6 py-6 font-semibold text-slate-800 whitespace-nowrap">
                    {m.nombrePersona}
                  </td>
                  <td className="px-6 py-6 text-slate-700 whitespace-nowrap">
                    {m.libro}
                  </td>
                  <td className="px-6 py-6 text-slate-600 whitespace-nowrap">
                    {m.fechaPrestamoFormateada}
                  </td>
                  <td className="px-6 py-6 text-slate-600 whitespace-nowrap">
                    {m.fechaVencimientoFormateada}
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.claseMora}`}>
                      {m.diasMora} días
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right font-bold text-slate-800 whitespace-nowrap">
                    {m.montoFormateado}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}