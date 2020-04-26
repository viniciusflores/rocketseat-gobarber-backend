import { Router } from 'express'
import CreateUserSessionService from '../services/CreateUserSessionService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body
    const createUserSessionService = new CreateUserSessionService()
    const { user, token } = await createUserSessionService.execute({
      email,
      password,
    })

    delete user.password
    return response.json({ user, token })
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default sessionsRouter
