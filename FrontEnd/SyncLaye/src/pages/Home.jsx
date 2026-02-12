import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Book, 
  UserRound, 
  Tags, 
  Users, 
  UserCog, 
  LogOut, 
  ArrowRight, 
  Handshake 
} from "lucide-react";
import Header from "../components/Header"; 


//Persistencia
export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  

  const menuItems = [
    { name: "Libros", path: "/libros", icon: <Book size={22} /> },
    { name: "Préstamos", path: "/prestamos", icon: <Handshake size={22} /> },
    { name: "Autores", path: "/autores", icon: <UserRound size={22} /> },
    { name: "Categorías", path: "/categorias", icon: <Tags size={22} /> },
    { name: "Personas", path: "/personas", icon: <Users size={22} /> },
    { name: "Usuarios", path: "/usuarios", icon: <UserCog size={22} /> },
  ];



  const cerrarSesion = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 py-20 font-sans antialiased text-slate-900 bg-slate-200">
      
      <Header user={user} />

      <main className="w-full max-w-xl text-center">
        {!user ? (
          <div className="space-y-8">
            <p className="text-slate-500 font-light text-lg leading-relaxed">
              Tu biblioteca digital
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-10 py-3 rounded-full bg-slate-200 shadow-[6px_6px_12px_#c8d0e7,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#c8d0e7,inset_-6px_-6px_12px_#ffffff] transition-all duration-300"
            >
              
              Comenzar
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center p-6 bg-slate-200 rounded-3xl shadow-[8px_8px_16px_#c8d0e7,-8px_-8px_16px_#ffffff] hover:shadow-[inset_6px_6px_12px_#c8d0e7,inset_-6px_-6px_12px_#ffffff] transition-all duration-300 group"
                >
                  <div className="text-slate-400 group-hover:text-blue-600 mb-3 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            <button 
              onClick={cerrarSesion}
              className="mt-12 inline-flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 transition-colors uppercase tracking-[0.2em] font-semibold"
            >
              <LogOut size={14} />
              Cerrar Sesión
            </button>
          </div>
        )}
      </main>
    </div>
  );
}