import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../servicios/api.js';
export default function RestablecerContrasena() {
  const [parametros] = useSearchParams();
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  async function enviar(evento) {
    evento.preventDefault();
    setError('');
    try {
      const cuerpo = await api.restablecerContrasena(parametros.get('token'), contrasena);
      setMensaje(cuerpo.mensaje);
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <form onSubmit={enviar} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-2xl font-bold">Nueva contraseña</h1>
        {mensaje ? (
          <>
            <p className="mb-4 text-green-700">{mensaje}</p>
            <Link className="text-indigo-600" to="/login">
              Ir al inicio de sesión
            </Link>
          </>
        ) : (
          <>
            <input
              required
              minLength="8"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="mb-4 w-full rounded-lg border border-slate-300 p-3"
              placeholder="Mínimo 8 caracteres"
            />
            {error && (
              <p role="alert" className="mb-4 text-red-700">
                {error}
              </p>
            )}
            <button className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white">
              Restablecer
            </button>
          </>
        )}
      </form>
    </main>
  );
}
