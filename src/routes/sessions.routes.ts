import { Router } from 'express'
import CreateUserSessionService from '../services/CreateUserSessionService'

const sessionsRouter = Router()

sessionsRouter.get('/', async (request, response) => {
  try {
    const { email, password } = request.body
    const createUserSessionService = new CreateUserSessionService()
    const { user } = await createUserSessionService.execute({
      email,
      password,
    })

    delete user.password
    return response.json({ user })
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default sessionsRouter
