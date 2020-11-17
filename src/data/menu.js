const RUTAS = [{
  label: 'Inicio',
  icon: 'fas fa-home',
  to: '/cuenta',
}, {
  'label': 'Usuarios',
  'icon': 'fas fa-users',
  'to': '/cuenta/usuarios'
}, {
  'label': 'Mascotas',
  'icon': 'fas fa-paw',
  'to': '/cuenta/mascotas'
}, {
  'label': 'Fichas Médicas',
  'icon': 'fas fa-file-medical',
  'to': '/cuenta/fichas'
}];

export const routes = {
  'ADMINISTRADOR': RUTAS,
  'VETERINARIO': [{
    label: 'Inicio',
    icon: 'fas fa-home',
    to: '/cuenta',
  }, {
    'label': 'Fichas Médicas',
    'icon': 'fas fa-file-medical',
    'to': '/cuenta/fichas',
    'rol': 'VETERINARIO'
  }],
  'USUARIO': [{
    label: 'Inicio',
    icon: 'fas fa-home',
    to: '/cuenta',
  }, {
    'label': 'Mascotas',
    'icon': 'fas fa-paw',
    'to': '/cuenta/mascotas',
    'rol': 'USUARIO'
  }]
}