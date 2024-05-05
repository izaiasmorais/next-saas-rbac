import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function main(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/', async (_, reply) => {
    return reply.status(200).send({
      message: 'Hello World!',
    })
  })
}
