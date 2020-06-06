import { Router } from 'express'
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import authenticateRouter from '@modules/users/infra/http/routes/authenticate.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/auth', authenticateRouter)

export default routes
