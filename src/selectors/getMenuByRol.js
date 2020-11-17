import { routes } from '../data/menu'

export const getMenuByRol = ( rol ) => {
  return routes[rol]
}