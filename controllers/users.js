const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    const users = await User.find({}).populate("blogs", {title: 1, author: 1, url: 1, likes: 1})
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        hash: passwordHash,
    })    
    const saved = await user.save()
    response.status(201).json(saved)
})

usersRouter.delete('/:id', async (req, res, next) =>{
    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = usersRouter