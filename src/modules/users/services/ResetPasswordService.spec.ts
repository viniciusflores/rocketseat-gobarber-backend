import FakeUsersRepositories from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUsersTokenRepositories from '@modules/users/repositories/fakes/FakeUsersTokenRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepositories
let fakeUsersTokenRepositories: FakeUsersTokenRepositories
let fakeHashProvider: FakeHashProvider
let resetPasswordService: ResetPasswordService

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories()
    fakeUsersTokenRepositories = new FakeUsersTokenRepositories()
    fakeHashProvider = new FakeHashProvider()
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokenRepositories,
      fakeHashProvider,
    )
  })

  it('Should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUsersTokenRepositories.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPasswordService.execute({
      token,
      password: '123123',
    })

    const updateUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('123123')
    expect(updateUser?.password).toBe('123123')
  })

  it('Should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokenRepositories.generate(
      'non-existing-user',
    )
    await expect(
      resetPasswordService.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to reset the password if pased more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUsersTokenRepositories.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()
      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPasswordService.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
