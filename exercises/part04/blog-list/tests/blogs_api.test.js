const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

const url = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get(url)
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('creating a new blog succeeds', async () => {
  await api
    .post(url)
    .send(helper.blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(url)

  const numberOfBlogs = response.body.length
  const initialNumberOfBlogs = helper.initialBlogs.length
  expect(numberOfBlogs).toBe(initialNumberOfBlogs+1)

  const created = numberOfBlogs-1
  expect(response.body[created].author).toBe(helper.blog.author)
  expect(response.body[created].likes).toBe(helper.blog.likes)
  expect(response.body[created].title).toBe(helper.blog.title)
  expect(response.body[created].url).toBe(helper.blog.url)
}, 100000)

test('id is defined', async () => {
  const response = await api.get(url)
  const id = response.body[0].id
  expect(id).toBeDefined()
}, 100000)

test('there is a correct number of blogs', async () => {
  const response = await api.get(url)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
