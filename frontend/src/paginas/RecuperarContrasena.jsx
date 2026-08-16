import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../servicios/api.js';

export default function RecuperarContrasena() {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  async function enviar(evento) {
    evento.preventDefault();
    setError('');
    try {
      await api.solicitarRecuperacion(correo);
      setMensaje('Si el correo está registrado, recibirás instrucciones para continuar.');
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <form onSubmit={enviar} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-3 text-2xl font-bold">Recuperar contraseña</h1>
        <p className="mb-6 text-slate-600">Indica tu correo registrado.</p>
        {mensaje && <p className="mb-4 text-green-700">{mensaje}</p>}
        {error && (
          <p role="alert" className="mb-4 text-red-700">
            {error}
          </p>
        )}
        <input
          required
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-300 p-3"
          placeholder="correo@ejemplo.com"
        />
        <button className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white">
          Solicitar enlace
        </button>
        <Link className="mt-4 block text-center text-indigo-600" to="/login">
          Volver al inicio de sesión
        </Link>
      </form>
    </main>
  );
}
