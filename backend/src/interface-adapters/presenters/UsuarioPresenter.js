export function presentarUsuario(usuario) {
  if (!usuario) return null;
  const publico = { ...usuario };
  delete publico.contrasenaHash;
  return publico;
}

export function presentarUsuarios(usuarios) {
  return usuarios.map(presentarUsuario);
}
