import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import UsersController from '@modules/users/infra/http/controllers/UsersControllers'
import UserAvatarControllers from '@modules/users/infra/http/controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarControllers = new UserAvatarControllers()
const upload = multer(uploadConfig)

usersRouter.post('/', usersController.create)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControllers.update,
)

export default usersRouter
