import LayoutAutenticado from '../componentes/LayoutAutenticado.jsx';
import TablaUsuarios from '../componentes/TablaUsuarios.jsx';
import TarjetaEstadistica from '../componentes/TarjetaEstadistica.jsx';

export default function PanelAdministrador() {
  return (
    <LayoutAutenticado>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Panel de control
          </p>
          <p className="mt-2 max-w-2xl text-slate-500">
            Gestiona las personas que mantienen activa la experiencia académica
          </p>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <TarjetaEstadistica
            etiqueta="Usuarios"
            valor="--"
            detalle="Consulta el listado actualizado abajo"
          />
          <TarjetaEstadistica
            etiqueta="Accesos activos"
            valor="--"
            detalle="Usuarios habilitados para ingresar"
            color="emerald"
          />
          <TarjetaEstadistica
            etiqueta="Roles"
            valor="3"
            detalle="Administrador, profesor y estudiante"
            color="amber"
          />
        </div>
        <TablaUsuarios />
      </div>
    </LayoutAutenticado>
  );
}
