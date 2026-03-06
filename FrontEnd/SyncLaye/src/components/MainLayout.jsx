import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const year = new Date().getFullYear();

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
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer
        className="
          py-6
          text-center
          bg-slate-200
          shadow-[inset_3px_3px_6px_#c8d0e7,inset_-3px_-3px_6px_#ffffff]
        "
      >
        <div className="flex flex-col items-center gap-1">

          <div className="w-8 h-[1px] bg-slate-300 mb-2"></div>
          <p className="text-[9px] text-slate-600 tracking-[0.25em] uppercase font-semibold">
            UDEM · Facultad de Ingeniería
          </p>

          <p className="text-[8px] text-slate-500 tracking-[0.2em] uppercase">
            Desarrollado por Estudiantes · {year}
          </p>

          <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase">
            Versión 1.0.1
          </p>
        </div>
      </footer>
    </div>
  );
}