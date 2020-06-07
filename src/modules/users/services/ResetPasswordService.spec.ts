import FakeUsersRepositories from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUsersTokenRepositories from '@modules/users/repositories/fakes/FakeUsersTokenRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepositories
let fakeUsersTokenRepositories: FakeUsersTokenRepositories
let resetPasswordService: ResetPasswordService

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories()
    fakeUsersTokenRepositories = new FakeUsersTokenRepositories()
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokenRepositories,
    )
  })

  it('Should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUsersTokenRepositories.generate(user.id)

    await resetPasswordService.execute({
      token,
      password: '123123',
    })

    const updateUser = await fakeUsersRepository.findById(user.id)

    expect(updateUser?.password).toBe('123123')
  })
})
