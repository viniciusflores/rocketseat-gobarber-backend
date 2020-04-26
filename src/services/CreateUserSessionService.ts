import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class CreateUserSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrent email/password combination')
    }

    const paswwordMatched = await compare(password, user.password)
    if (!paswwordMatched) {
      throw new Error('Incorrent email/password combination')
    }

    const token = sign({}, '99007a70787247e5307bfcbb00dd8bc2', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    }
  }
}

export default CreateUserSessionService
