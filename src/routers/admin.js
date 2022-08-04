import { Router } from 'express'
import AdminRepo from '../repositories/admin.js'

export const adminRouter = Router()

adminRouter.get('/admin/:id', async (req, res) => {
    const admin = await AdminRepo.find(req.params.id)
    if (!admin) return res.statusCode(404)

    return admin
})

adminRouter.get('/admins', async (req, res) => {
    const admin = await AdminRepo.findAll()
    return admin
})

adminRouter.post('/admin', async (req, res) => {
    await AdminRepo.create(req.body)
    return res.sendStatus(201)
})

adminRouter.patch('/admin/:id', async (req, res) => {
    await AdminRepo.update(req.params.id, req.body)
    return res.sendStatus(200)
})

adminRouter.delete('/admin/:id', async (req, res) => {
    await AdminRepo.delete(req.params.id)
    return res.sendStatus(200)
})