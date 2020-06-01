import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from '@modules/users/infra/typeorm/entities/User'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class CreateUserSessionService {
  constructor(private usersRepository: IUsersRepository){}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrent email/password combination', 401)
    }

    const paswwordMatched = await compare(password, user.password)
    if (!paswwordMatched) {
      throw new AppError('Incorrent email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default CreateUserSessionService