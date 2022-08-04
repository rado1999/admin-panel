import { Router } from 'express'
import ProductsRepo from '../repositories/products.js'

export const productsRouter = Router()

productsRouter.get('/products', async (req, res) => {
    const products = await ProductsRepo.findAll()
    if (!products) return res.sendStatus(404)
    return res.send(products)
})

productsRouter.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const products = await ProductsRepo.find(id)
    if (!products) return res.sendStatus(404)
    return res.send(products)
})

productsRouter.post('/products', async (req, res) => {
    await ProductsRepo.create(req.body)
    return res.sendStatus(201)
})

productsRouter.patch('/products/:id', async (req, res) => {
    const { id } = req.params
    await ProductsRepo.update(id, req.body)
    return res.status(200).send('Updated')
})

productsRouter.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    await ProductsRepo.delete(id)
    return res.status(200).send('Deleted')
})
