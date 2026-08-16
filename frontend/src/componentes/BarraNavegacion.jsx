import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LogOut, Menu, UserRound, X } from 'lucide-react';
import { useAutenticacion } from '../contexto/ContextoAutenticacion.jsx';
import { etiquetasRol, obtenerIniciales } from '../utilidades/perfil.js';

export default function BarraNavegacion() {
  const { sesion, cerrarSesion } = useAutenticacion();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const usuario = sesion?.usuario;
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuAbierto(false)}>
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-sm font-black text-white">
            SG
          </span>
          <span className="hidden sm:block">
            <strong className="block text-sm text-slate-950">Aula Central</strong>
            <small className="text-xs text-slate-500">Gestión académica</small>
          </span>
        </Link>
        <div className="relative">
          <button
            type="button"
            aria-label="Abrir menú de usuario"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex items-center gap-2 rounded-xl p-1.5 text-left hover:bg-slate-50"
          >
            <span className="grid size-9 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              {obtenerIniciales(usuario?.nombre)}
            </span>
            <span className="hidden lg:block">
              <strong className="block text-sm text-slate-800">{usuario?.nombre}</strong>
              <small className="text-xs text-slate-500">{etiquetasRol[usuario?.rol]}</small>
            </span>
            <ChevronDown className="hidden size-4 text-slate-400 sm:block" />
            {menuAbierto ? (
              <X className="size-5 text-slate-500 md:hidden" />
            ) : (
              <Menu className="size-5 text-slate-500 md:hidden" />
            )}
          </button>
          {menuAbierto && (
            <div className="absolute right-0 top-14 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <div className="border-b border-slate-100 px-3 py-3">
                <p className="text-sm font-semibold text-slate-900">{usuario?.nombre}</p>
                <p className="truncate text-xs text-slate-500">{usuario?.correo}</p>
              </div>
              <Link
                to="/perfil"
                onClick={() => setMenuAbierto(false)}
                className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <UserRound className="size-4" /> Mi perfil
              </Link>
              <button
                type="button"
                onClick={cerrarSesion}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="size-4" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
