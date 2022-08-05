import { Router } from 'express'
import UsersRepo from '../repositories/users.js'
import AdminRepo from '../repositories/admin.js'
import ProductsRepo from '../repositories/products.js'
import { checkToken } from '../utils/jwt.js'

export const pagesRouter = Router()

pagesRouter.get('/', async (req, res) => {
    return res.render('login')
})

pagesRouter.get('/users-page', checkToken, async (req, res) => {
    const users = await UsersRepo.findAll()
    return res.render('users', { users })
})

pagesRouter.get('/user-edit/:id', checkToken, async (req, res) => {
    const user = await UsersRepo.find(req.params.id)
    return res.render('edit', { result: [user, 'User'] })
})

pagesRouter.get('/user-create', checkToken, async (req, res) => {
    const columns = ['email', 'phone', 'name']
    return res.render('create', { result: [columns, 'User'] })
})

pagesRouter.get('/admins-page', checkToken, async (req, res) => {
    const admins = await AdminRepo.findAll()
    return res.render('admins', { admins })
})

pagesRouter.get('/admin-edit/:id', checkToken, async (req, res) => {
    const admin = await AdminRepo.find(req.params.id)
    return res.render('edit', { result: [admin, 'Admin'] })
})

pagesRouter.get('/admin-create', checkToken, async (req, res) => {
    const columns = ['username', 'login', 'password', 'roleId']
    return res.render('create', { result: [columns, 'Admin'] })
})

pagesRouter.get('/products-page', checkToken, async (req, res) => {
    const products = await ProductsRepo.findAll()
    return res.render('products', { products })
})

pagesRouter.get('/product-edit/:id', checkToken, async (req, res) => {
    const array = await ProductsRepo.forEdit(req.params.id)
    if (!array) return res.statusCode(404)
    return res.render('product-edit', { result: [array, 'Product'] })
})

pagesRouter.get('/product-create', checkToken, async (req, res) => {
    const columns = [
        'Title', 'Company', 'Model',
        'Description', 'Price', 'Category', 'Sub Category'
    ]
    const categories = await ProductsRepo.forCreate()
    return res.render('product-create', {
        result: [columns, 'Product', categories]
    })
})