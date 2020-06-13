import { MongoRepository, getMongoRepository } from 'typeorm'
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'

class NotificationsRepositories implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipientId,
    })

    await this.ormRepository.save(notification)

    return notification
  }
}

export default NotificationsRepositories
