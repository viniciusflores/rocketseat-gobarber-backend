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
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
    },
  },
} as ICacheConfig
