const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Test Blog",
        author: "Test Author",
        url: "test.blog",
        likes: 2
    },
    {
        title: "Testi Blogi",
        author: "Testi Authori",
        url: "testi.blogi",
        likes: 4
    }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

const getAll = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

test("GET returns correct amount of results", async() =>{
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test("POST adds a blog to the list", async() =>{
    const newBlog = {title: "testblog", author: "testauthor", url: "test.blog", likes: 0}
    
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const newBlogList = await getAll()
    expect(newBlogList.length).toBe(initialBlogs.length + 1)
    
    const titles = newBlogList.map(blog => blog.title)
    expect(titles).toContain("testblog")
})

test("DELETE removes blog from the list", async() =>{
    const initial = await getAll()
    const toDel = initial[0]

    await api.delete(`/api/blogs/${toDel.id}`).expect(204)
    const finalBlogs = await getAll()

    expect(finalBlogs.length).toBe(initial.length - 1)

    const titles = finalBlogs.map(blog => blog.title)

    expect(titles).not.toContain(toDel.title)
})

afterAll(() => {
  mongoose.connection.close()
})