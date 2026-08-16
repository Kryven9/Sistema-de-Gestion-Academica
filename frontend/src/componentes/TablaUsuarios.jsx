import { UserRoundX } from 'lucide-react';
import useUsuarios from '../hooks/useUsuarios.js';
import { etiquetasRol } from '../utilidades/perfil.js';

export default function TablaUsuarios() {
  const { usuarios, cargando, error, desactivarUsuario } = useUsuarios();
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold text-slate-950">Usuarios del sistema</h2>
          <p className="mt-1 text-sm text-slate-500">Administra accesos, roles y estados.</p>
        </div>
      </div>
      {error && <p className="m-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {cargando ? (
        <p className="p-8 text-center text-sm text-slate-500">Cargando usuarios...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Usuario</th>
                <th className="px-5 py-3 font-semibold">Rol</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 text-right font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{usuario.nombre}</p>
                    <p className="text-xs text-slate-500">{usuario.correo}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {etiquetasRol[usuario.rol] || usuario.rol}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${usuario.activo ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {usuario.activo && (
                      <button
                        type="button"
                        title="Desactivar usuario"
                        onClick={() => desactivarUsuario(usuario)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <UserRoundX className="size-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!usuarios.length && (
            <p className="p-8 text-center text-sm text-slate-500">No hay usuarios registrados.</p>
          )}
        </div>
      )}
    </section>
  );
}
