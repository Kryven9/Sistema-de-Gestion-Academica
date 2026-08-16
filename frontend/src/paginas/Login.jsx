import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contexto/ContextoAutenticacion.jsx';

function Login() {
  const { sesion, iniciarSesion } = useAutenticacion();
  const navegar = useNavigate();
  const [datos, setDatos] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  if (sesion) return <Navigate to="/" replace />;
  async function enviar(evento) {
    evento.preventDefault();
    setError('');
    setCargando(true);
    try {
      await iniciarSesion(datos.correo, datos.contrasena);
      navegar('/');
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <form onSubmit={enviar} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          SGA Universitario
        </p>
        <h1 className="mb-8 text-3xl font-bold text-slate-900">Iniciar sesión</h1>
        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <label className="mb-4 block text-sm font-medium text-slate-700">
          Correo
          <input
            required
            type="email"
            value={datos.correo}
            onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 p-3"
          />
        </label>
        <label className="mb-6 block text-sm font-medium text-slate-700">
          Contraseña
          <input
            required
            type="password"
            value={datos.contrasena}
            onChange={(e) => setDatos({ ...datos, contrasena: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 p-3"
          />
        </label>
        <button
          disabled={cargando}
          className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {cargando ? 'Validando...' : 'Entrar'}
        </button>
        <Link to="/recuperar-contrasena" className="mt-4 block text-center text-sm text-indigo-600">
          ¿Olvidaste tu contraseña?
        </Link>
      </form>
    </main>
  );
}
export default Login;
