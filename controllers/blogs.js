const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getToken = request =>{
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()
    response.status(201).json(saved.toJSON())
})

blogsRouter.delete('/:id', async (req, res, next) =>{
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = blogsRouter