import { config as dotenv } from 'dotenv'
import * as Eta from 'eta'
import fastify_ from 'fastify'
import path from 'path'
import { fileURLToPath } from 'url'
import { options } from './libs/config/options/_options_.js'
import config from './libs/config/configuration.js'
import isSpam from './libs/decorators/spam.js'
import isBot from './libs/decorators/visitorsFilter.js'
import routes from './libs/routes/wv.js'
import GracefulServer from '@gquittet/graceful-server'
import fastify from 'fastify'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyRedis from '@fastify/redis'
import fastifyStatic from '@fastify/static'
import viewsPlugin from '@fastify/view'

const { helmet, logger } = options

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv()

const fastify = fastify_({
  logger: logger(),
  disableRequestLogging: true,
  keepAliveTimeout: 10000,
  requestTimeout: 5000,
})
const gracefulServer = GracefulServer(fastify.server)
// TODO: manage open resources
gracefulServer.on(GracefulServer.READY, () => {
  fastify.log.info('Server is ready')
  console.log('Server is ready')
})
gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
  fastify.log.error('Server is shutting down')
  console.error('Server is shutting down')
})
gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
  fastify.log.error('Server is down because of', error.message)
  console.error('Server is down because of', error.message)
})
// SERVE STATIC CONTENT
fastify.register(fastifyStatic, { root: path.join(__dirname, 'public') })

fastify.register(fastifyHelmet, helmet())
fastify.register(fastifyRedis, { host: config('REDIS_HOST'), port: 6379, password: config('PASSWORD') })
fastify.register(fastifyFlash)


/*********************************************************************************************** */
// TODO: find a way to strip very long eta logging errors
fastify.register(viewsPlugin, {
  engine: {
    eta: Eta,
  },
  templates: 'templates',
  options: { useWith: true },
})

fastify.addHook('onRequest', isBot)

/*********************************************************************************************** */
// !!SPAM ASSASSIN !!
fastify.register(fastifyRateLimit, config('PING_LIMITER'))
// TODO: Rate limiter && honeyPot except in process.env === "api"
fastify.addHook('onRequest', isSpam)

// const localize = {
//     en: require('ajv-i18n/localize/en'),
//     'en-US': require('ajv-i18n/localize/en'),
//     ar: require('ajv-i18n/localize/ar'),
//     fr: require('ajv-i18n/localize/fr'),
// }

// All unhandled errors which are handled by fastify: just send http response
// fastify.setErrorHandler(function (error, request, reply) {
//     if (reply.statusCode === 429) {
//         error.message = 'You hit the rate limit! Slow down please!'
//         reply.send(error)
//         return reply
//     }

//     if (error.validation) {
//         localize[request.cookies.locale || 'en'](error.validation)
//         reply.status(422).send(error.validation)
//         return reply
//     }
//     error.message = error.message.slice(0, 3000)
//     request.log.error(error)
//     error.message = 'Server is having hard times :( Please try again later.'
//     reply.status(409).send(error)
// })

// fastify.register(chatRouter, { prefix: 'chat' })
fastify.register(routes)

const start = async () => {
  try {
    const port = process.env.PORT || config('NODE_PORT')
    console.log('The app is accessible on port: ' + port)
    await fastify.listen({ port, host: '0.0.0.0' })
    gracefulServer.setReady()
  } catch (err) {
    console.log(err)
    fastify.log.error(err)
    process.exit(1)
  }
}
await start()
