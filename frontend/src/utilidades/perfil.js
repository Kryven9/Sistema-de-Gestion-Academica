export const etiquetasRol = {
  ADMINISTRADOR: 'Administrador',
  PROFESOR: 'Profesor',
  ESTUDIANTE: 'Estudiante',
};

export function obtenerIniciales(nombre = '') {
  return nombre
    .split(' ')
    .map((parte) => parte[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
