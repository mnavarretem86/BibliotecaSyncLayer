import { useState } from 'react'
import { BookOpen, Mail, Lock, ChevronRight } from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Iniciando sesión en BibliotecaDB...', { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 text-white">
        
        <div className="flex flex-col items-center mb-10">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
            <BookOpen size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Gestión de Préstamos y Catálogo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Correo Electrónico</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="ejemplo@biblioteca.com"
                className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-800 transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-800/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-800 transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-4 shadow-xl shadow-indigo-600/20"
          >
            Ingresar al Sistema
            <ChevronRight size={20} />
          </button>
        </form>

        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>&copy; 2026 SyncLaye - Panel de Administración</p>
        </footer>
      </div>
    </div>
  )
}

export default App