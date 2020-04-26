import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import User from '../models/User'

interface Request {
  email: string
  password: string
}
class CreateUserSessionService {
  public async execute({ email, password }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrent email/password combination')
    }

    const paswwordMatched = await compare(password, user.password)

    return user
  }
}

export default CreateUserSessionService
