import BarraNavegacion from './BarraNavegacion.jsx';

export default function LayoutAutenticado({ children }) {
  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <BarraNavegacion />
      <main>{children}</main>
    </div>
  );
}
