import { expect, test } from 'vitest'
import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'

test('get courses', async () => {
  await server.ready()

  const titleId = randomUUID()

  const course = await makeCourse(titleId)
  // TODO : com Enrollment

  const response = await request(server.server)
    .get(`/courses?search=${titleId}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: 0,
      }
    ]
  })
})