import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis'

  config: {
    redis: RedisOptions
  }
}

export default {
  driver: 'redis',

  config: {
    regis: {
      host: 'localhost',
      port: 6379,
      password: undefined,
    },
  },
} as ICacheConfig
