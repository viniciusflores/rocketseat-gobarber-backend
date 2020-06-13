import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year, day } = request.body

    const listProviderDayAvailability = container.resolve(
      ProviderDayAvailability,
    )

    const providers = await listProviderDayAvailability.execute({
      provider_id,
      month,
      year,
      day,
    })

    return response.json(providers)
  }
}
