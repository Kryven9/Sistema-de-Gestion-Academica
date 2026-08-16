import { Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useAutenticacion } from '../contexto/ContextoAutenticacion.jsx';
import LayoutAutenticado from '../componentes/LayoutAutenticado.jsx';
import { etiquetasRol, obtenerIniciales } from '../utilidades/perfil.js';

export default function Perfil() {
  const { sesion } = useAutenticacion();
  const usuario = sesion.usuario;
  return (
    <LayoutAutenticado>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Cuenta</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Mi perfil</h1>
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-full bg-indigo-500 text-xl font-bold">
                {obtenerIniciales(usuario.nombre)}
              </span>
              <div>
                <h2 className="text-xl font-bold">{usuario.nombre}</h2>
                <p className="text-sm text-slate-300">Perfil de {etiquetasRol[usuario.rol]}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 text-indigo-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Correo electrónico
                </p>
                <p className="mt-1 text-slate-800">{usuario.correo}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 text-emerald-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rol</p>
                <p className="mt-1 text-slate-800">{etiquetasRol[usuario.rol]}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserRound className="mt-0.5 size-5 text-slate-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Estado
                </p>
                <p className="mt-1 text-emerald-700">Cuenta activa</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutAutenticado>
  );
}
