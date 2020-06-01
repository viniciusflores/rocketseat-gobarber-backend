import { Router } from 'express'
import CreateUserSessionService from '@modules/users/services/CreateUserSessionService'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository()
  const { email, password } = request.body
  const createUserSessionService = new CreateUserSessionService(usersRepository)
  const { user, token } = await createUserSessionService.execute({
    email,
    password,
  })

  delete user.password
  return response.json({ user, token })
})

export default sessionsRouter
