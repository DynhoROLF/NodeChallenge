import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const healthCheckRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/health', {
    schema: {
      tags: ['Health'],
      summary: 'Health Check',
      response: {
        200: z.string()
      }
    }
  }, async (request, reply) => {

    return reply.status(200).send('Server OK')
  })
}