import { Router } from 'express'
import UsersRepo from '../repositories/users.js'
import ProductsRepo from '../repositories/products.js'

export const pagesRouter = Router()

pagesRouter.get('/', async (req, res) => {
    return res.render('login')
})

pagesRouter.get('/users-page', async (req, res) => {
    const users = await UsersRepo.findAll()
    return res.render('users', { users })
})

pagesRouter.get('/user-edit/:id', async (req, res) => {
    const { id } = req.params
    const user = await UsersRepo.find(id)
    return res.render('edit', { result: [user, 'User'] })
})

pagesRouter.get('/user-create', async (req, res) => {
    const columns = ['Email', 'Phone', 'Name']
    return res.render('create', { result: [columns, 'User'] })
})

pagesRouter.get('/products-page', async (req, res) => {
    const products = await ProductsRepo.findAll()
    return res.render('products', { products })
})

pagesRouter.get('/product-edit/:id', async (req, res) => {
    const { id } = req.params
    const array = await ProductsRepo.forEdit(id)
    if (!array) return res.statusCode(404)
    return res.render('product-edit', { result: [array, 'Product'] })
})