import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import multer from 'multer'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import UsersController from '@modules/users/infra/http/controllers/UsersControllers'
import UserAvatarControllers from '@modules/users/infra/http/controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarControllers = new UserAvatarControllers()
const upload = multer(uploadConfig.multer)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControllers.update,
)

export default usersRouter
