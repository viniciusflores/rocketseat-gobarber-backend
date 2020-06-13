import FakeAppointmentsRepositories from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepositories
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepositories()
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
  })

  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123',
      user_id: '1234',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123')
    expect(appointment.user_id).toBe('1234')
  })

  it('Should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 5, 6, 10)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123',
      user_id: '1234',
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
