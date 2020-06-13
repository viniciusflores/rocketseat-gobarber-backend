import FakeUsersRepositories from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import ShowProfileService from '@modules/users/services/ShowProfileService'

let fakeUsersRepository: FakeUsersRepositories
let showProfile: ShowProfileService

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories()

    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('Should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const profile = await showProfile.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('johndoe@example.com')
  })

  it('Should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
