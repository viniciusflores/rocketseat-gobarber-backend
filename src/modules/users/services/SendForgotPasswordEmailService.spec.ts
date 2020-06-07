import FakeUsersRepositories from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUsersTokenRepositories from '@modules/users/repositories/fakes/FakeUsersTokenRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepositories
let fakeMailProvider: FakeMailProvider
let fakeUsersTokenRepositories: FakeUsersTokenRepositories
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories()
    fakeMailProvider = new FakeMailProvider()
    fakeUsersTokenRepositories = new FakeUsersTokenRepositories()

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepositories,
    )
  })

  it('Should be able to create a new user', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail')
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(sendEmail).toHaveBeenCalled()
  })

  it('Should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepositories, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
