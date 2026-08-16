import { GraduationCap } from 'lucide-react';
import LayoutAutenticado from '../componentes/LayoutAutenticado.jsx';
import TarjetaEstadistica from '../componentes/TarjetaEstadistica.jsx';

export default function PanelProfesor() {
  return (
    <LayoutAutenticado>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div>
            <p className="mt-2 text-slate-500">
              Consulta cursos, tareas y entregas de tus estudiantes
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <TarjetaEstadistica
            etiqueta="Cursos asignados"
            valor="--"
            detalle="Durante el período activo"
          />
          <TarjetaEstadistica
            etiqueta="Tareas abiertas"
            valor="--"
            detalle="Pendientes de revisión"
            color="amber"
          />
          <TarjetaEstadistica
            etiqueta="Estudiantes"
            valor="--"
            detalle="En tus cursos"
            color="emerald"
          />
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
          <GraduationCap className="size-4" /> Herramientas docentes del SGA
        </div>
      </div>
    </LayoutAutenticado>
  );
}
