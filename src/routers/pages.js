import { Router } from 'express'
import UsersRepo from '../repositories/users.js'
import ProductsRepo from '../repositories/products.js'

export const pagesRouter = Router()

pagesRouter.get('/users-page', async (req, res) => {
    const users = await UsersRepo.findAll()
    res.render('users', { users })
})

pagesRouter.get('/products-page', async (req, res) => {
    const products = await ProductsRepo.findAll()
    res.render('products', { products })
})