export default function TarjetaEstadistica({ etiqueta, valor, detalle, color = 'indigo' }) {
  const colores = { indigo: 'bg-indigo-500', emerald: 'bg-emerald-500', amber: 'bg-amber-500' };
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-6 size-2 rounded-full ${colores[color] || colores.indigo}`} />
      <p className="text-sm text-slate-500">{etiqueta}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{valor}</p>
      {detalle && <p className="mt-2 text-xs text-slate-500">{detalle}</p>}
    </article>
  );
}
