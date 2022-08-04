import { Router } from 'express'
import UsersRepo from '../repositories/users.js'

export const userRouter = Router()

userRouter.get('/users', async (req, res) => {
    const users = await UsersRepo.findAll()
    if (!users) return res.sendStatus(404)
    return res.send(users)
})

userRouter.get('/users/:id', async (req, res) => {
    const { id } = req.params
    const user = await UsersRepo.find(id)
    if (!user) return res.sendStatus(404)
    return res.send(user)
})

userRouter.post('/users', async (req, res) => {
    const { email, phone, name } = req.body
    await UsersRepo.create(email, phone, name)
    return res.sendStatus(201)
})

userRouter.patch('/users/:id', async (req, res) => {
    const { id } = req.params
    const { email, phone, name } = req.body
    await UsersRepo.update(id, email, phone, name)
    return res.status(200).send('Updated')
})

userRouter.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    await UsersRepo.delete(id)
    return res.status(200).send('Deleted')
})
