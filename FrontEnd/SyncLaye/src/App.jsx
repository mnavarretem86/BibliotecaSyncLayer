import { Construction, Sparkles, Wind } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
      
      <div className="flex flex-col items-center text-center gap-6 flex-1 justify-center">

        <div className="bg-indigo-600/20 p-6 rounded-3xl shadow-lg shadow-indigo-500/20">
          <Construction size={64} className="text-indigo-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          En Construcción
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-indigo-400">
          Biblioteca Avanzada SyncLayer
        </h2>

        <p className="text-slate-400 text-sm md:text-base">
          Creada con <span className="font-semibold text-white">Vite + React + TailwindCSS</span>
        </p>
      </div>

      <footer className="w-full max-w-2xl pb-8">
        <div className="flex items-center justify-center gap-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">

          <div className="flex items-center gap-2 text-sky-400 font-semibold">
            <Wind size={20} />
            TailwindCSS
          </div>

          <div className="w-px h-6 bg-white/10" />

          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <Sparkles size={20} />
            Lucide React
          </div>

        </div>

        <p className="text-center text-xs text-slate-500 mt-3">
        ❤️ “Desarrollado con dedicación por estudiantes de la Universidad de Managua.”
        </p>
      </footer>

    </div>
  )
}
export default App
