import { Router } from 'express'
import ProductsRepo from '../repositories/products.js'

export const productsRouter = Router()

productsRouter.get('/products', async (req, res) => {
    const products = await ProductsRepo.findAll()
    if (!products) return res.sendStatus(404)
    return res.send(products)
})

productsRouter.get('/product/:id', async (req, res) => {
    const product = await ProductsRepo.find(req.params.id)
    if (!product) return res.sendStatus(404)
    return res.send(product)
})

productsRouter.post('/product', async (req, res) => {
    await ProductsRepo.create(req.body)
    return res.sendStatus(201)
})

productsRouter.patch('/product/:id', async (req, res) => {
    await ProductsRepo.update(req.params.id, req.body)
    return res.status(200).send('Updated')
})

productsRouter.delete('/product/:id', async (req, res) => {
    await ProductsRepo.delete(req.params.id)
    return res.status(200).send('Deleted')
})
