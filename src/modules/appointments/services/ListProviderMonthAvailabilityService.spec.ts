import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    )
  })

  it('Should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 8, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 9, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 10, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 11, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 12, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 13, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 14, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 15, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 16, 0, 0),
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 12, 17, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user-fake-id',
      date: new Date(2020, 5, 13, 10, 0, 0),
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user-fake-id',
      year: 2020,
      month: 6,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 11, available: true },
        { day: 12, available: false },
        { day: 13, available: true },
        { day: 14, available: true },
      ]),
    )
  })
})
