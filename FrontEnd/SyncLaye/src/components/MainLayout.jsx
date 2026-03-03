import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-200
        flex flex-col
        font-sans
        antialiased
        text-slate-900
      "
    >
      
      {/* CONTENIDO */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer
        className="
          py-6
          text-center
          bg-slate-200
          shadow-[inset_3px_3px_6px_#c8d0e7,inset_-3px_-3px_6px_#ffffff]
        "
      >
        <div className="flex flex-col items-center gap-1">

          {/* Línea decorativa */}
          <div className="w-8 h-[1px] bg-slate-300 mb-2"></div>

          <p className="text-[9px] text-slate-500 tracking-[0.25em] uppercase font-semibold">
            UDEM · Facultad de Ingeniería
          </p>

          <p className="text-[8px] text-slate-400 tracking-[0.2em] uppercase font-light">
            Desarrollado por Estudiantes · 2026
          </p>

        </div>
      </footer>
    </div>
  );
}