import { Router } from 'express'
import AuthenticateController from '@modules/users/infra/http/controllers/AuthenticateControllerControllers'

const sessionsRouter = Router()
const authenticateController = new AuthenticateController()

sessionsRouter.post('/', authenticateController.create)

export default sessionsRouter
