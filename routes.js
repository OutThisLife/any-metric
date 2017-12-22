import nextRoutes from 'next-routes'

const routes = nextRoutes()
routes.add('main', '/:slug/:child?', 'index')

export default routes
