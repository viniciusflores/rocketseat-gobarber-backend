import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    )
  })

  it('Should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'user-fake-id',
      date: new Date(2020, 7, 13, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'user-fake-id',
      date: new Date(2020, 7, 13, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 13, 12, 0, 0).getTime()
    })

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'fake-provider-id',
      year: 2020,
      month: 8,
      day: 13,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    )
  })
})
