import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifyJwt from '@fastify/jwt'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { getProfile } from './routes/auth/get-profile'
import { errorHandler } from './error-handler'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'
import { authenticateWithGithub } from './routes/auth/authenticate-with-github'
import { env } from '@saas/env'
import { createOrganization } from './routes/orgs/create-organization'
import { getMembership } from './routes/orgs/get-membership'
import { getOrganization } from './routes/orgs/get-organization'
import { getOrganizations } from './routes/orgs/get-organizations'
import { removeOrganization } from './routes/orgs/remove-organization'

const port = process.env.PORT || '3333'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.setErrorHandler(errorHandler)
app.register(fastifyCors)
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js Saas',
      description: 'Full-stack Saas app with multi-tenant & RBAC',
      version: '1.0.0',
    },
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		}
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// auth
app.register(getProfile)
app.register(createAccount)
app.register(authenticateWithGithub)
app.register(authenticateWithPassword)
app.register(requestPasswordRecover)
app.register(resetPassword)

// organization
app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(removeOrganization)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log(`HTTP server running at ${port}`)
})
