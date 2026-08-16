import { CalendarDays, CheckCircle2, Library } from 'lucide-react';
import LayoutAutenticado from '../componentes/LayoutAutenticado.jsx';
import TarjetaEstadistica from '../componentes/TarjetaEstadistica.jsx';

export default function PanelEstudiante() {
  return (
    <LayoutAutenticado>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mt-2 text-slate-500">Encuentra tus cursos, entregas y avances académicos</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <TarjetaEstadistica
            etiqueta="Cursos inscritos"
            valor="--"
            detalle="En el período actual"
            color="emerald"
          />
          <TarjetaEstadistica
            etiqueta="Tareas pendientes"
            valor="--"
            detalle="No pierdas ninguna fecha"
            color="amber"
          />
          <TarjetaEstadistica
            etiqueta="Promedio actual"
            valor="--"
            detalle="Aún no hay calificaciones"
          />
        </div>
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <Library className="size-5" />
              </span>
              <div>
                <h2 className="font-bold">Mis cursos</h2>
                <p className="text-sm text-slate-500">Tu agenda académica aparecerá aquí</p>
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
              No hay cursos para mostrar todavía
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-700">
                <CalendarDays className="size-5" />
              </span>
              <div>
                <h2 className="font-bold">Próximas entregas</h2>
                <p className="text-sm text-slate-500">Organiza tus pendientes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              <CheckCircle2 className="size-5 text-emerald-500" /> No hay entregas pendientes
            </div>
          </article>
        </section>
      </div>
    </LayoutAutenticado>
  );
}
