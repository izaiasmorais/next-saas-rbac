import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function seed() {
  const passwordHash = await hash('123456', 1)
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const firstUser = await prisma.user.create({
    data: {
      name: 'Izaías',
      email: 'izaiaslima356@gmail.com',
      avatarUrl: 'https://github.com/izaiasmorais',
      passwordHash,
    },
  })

  const secondUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  const thirdUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Compex Inc (Admin)',
      domain: 'compex.com',
      slug: 'compex-admin',
      avatarUrl: faker.image.avatar(),
      shouldAttachUsersByDomain: true,
      ownerId: firstUser.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: firstUser.id,
              role: 'ADMIN',
            },
            {
              userId: secondUser.id,
              role: 'MEMBER',
            },
            {
              userId: thirdUser.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Compex Inc (Member)',
      slug: 'compex-member',
      avatarUrl: faker.image.avatar(),
      ownerId: firstUser.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: firstUser.id,
              role: 'MEMBER',
            },
            {
              userId: secondUser.id,
              role: 'ADMIN',
            },
            {
              userId: thirdUser.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Compex Inc (Billing)',
      slug: 'compex-billing',
      avatarUrl: faker.image.avatar(),
      ownerId: firstUser.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                firstUser.id,
                secondUser.id,
                thirdUser.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: firstUser.id,
              role: 'BILLING',
            },
            {
              userId: secondUser.id,
              role: 'ADMIN',
            },
            {
              userId: thirdUser.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })
}

seed().then(() => {
  console.log('Seed complete')
})
