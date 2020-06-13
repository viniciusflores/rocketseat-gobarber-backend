import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    )
  })

  it('Should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'user-fake-id',
      date: new Date(2020, 6, 12, 8, 0, 0),
    })
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'user-fake-id',
      date: new Date(2020, 6, 12, 9, 0, 0),
    })

    const appointmentsOnDay = await listProviderAppointments.execute({
      provider_id: 'fake-provider-id',
      year: 2020,
      month: 7,
      day: 12,
    })

    expect(appointmentsOnDay).toEqual([appointment1, appointment2])
  })
})
