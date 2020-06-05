import FakeAppointmentsRepositories from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepositories()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    )

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123')
  })

  // it('Should not be able to create two appointments on the same time', () => {})
})
