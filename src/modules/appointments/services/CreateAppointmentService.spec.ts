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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 12, 12),
      provider_id: '123',
      user_id: '1234',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123')
    expect(appointment.user_id).toBe('1234')
  })

  it('Should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 6, 10)

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

  it('Should not be able to create an appointmens on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 1, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2006, 8, 16, 22),
        provider_id: '123',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create an appointmens with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 1, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 8, 16, 22),
        provider_id: '123',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create an appointmens with before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 11, 7),
        provider_id: '123',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 11, 18),
        provider_id: '123',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
