import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-slate-900">
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="py-10 text-center border-t border-slate-50 bg-white">
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-[1px] bg-slate-200 mb-2"></div>
          <p className="text-[9px] text-slate-400 tracking-[0.3em] uppercase font-bold">
            UDEM · FACULTAD DE INGENIERÍA
          </p>
          <p className="text-[8px] text-slate-300 tracking-[0.2em] uppercase font-light">
            Desarrollado por Estudiantes — 2026
          </p>
        </div>
      </footer>
    </div>
  );
}