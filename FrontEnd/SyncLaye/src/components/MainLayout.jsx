import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="
      min-h-screen
      bg-slate-200
      flex flex-col
      font-sans
      antialiased
      text-slate-900
    ">
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="
        py-10
        text-center
        bg-slate-200
        shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
      ">
        <div className="flex flex-col items-center gap-1">

          <div className="w-4 h-[1px] bg-slate-300 mb-2"></div>

          <p className="text-[9px] text-slate-500 tracking-[0.3em] uppercase font-bold">
            UDEM · FACULTAD DE INGENIERÍA
          </p>

          <p className="text-[8px] text-slate-400 tracking-[0.2em] uppercase font-light">
            Desarrollado por Estudiantes — 2026
          </p>

        </div>
      </footer>
    </div>
  );
}
