import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository()
  const { name, email, password } = request.body

  const createUser = new CreateUserService(usersRepository)
  const user = await createUser.execute({
    name,
    email,
    password,
  })

  delete user.password

  return response.json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository()
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password

    return response.json(user)
  },
)

export default usersRouter