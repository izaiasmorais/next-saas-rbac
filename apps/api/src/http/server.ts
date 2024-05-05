import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'
import { main } from './routes/base'

const port = process.env.PORT || '3333'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(createAccount)

app.register(main)

app.listen({ port: Number(port) }).then(() => {
  console.log(`HTTP server running at ${port}`)
})
