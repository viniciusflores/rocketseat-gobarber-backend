import { Router } from 'express'
import { container } from 'tsyringe'
import CreateUserSessionService from '@modules/users/services/CreateUserSessionService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const createUserSessionService = container.resolve(CreateUserSessionService)

  const { user, token } = await createUserSessionService.execute({
    email,
    password,
  })

  delete user.password
  return response.json({ user, token })
})

export default sessionsRouter
