import { Router } from 'express'
import ProductsRepo from '../repositories/products.js'
import multer from 'multer'

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/sumbar/main/public/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploads = multer({ storage: storageConfig })

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

productsRouter.post('/product', uploads.fields([
    { name: 'images' }, { name: 'logo', maxCount: 1 }
]), async (req, res) => {
    const {
        Title, Company, Model, Description, Price, category, subCategory
    } = req.body

    let urls, logo
    console.log(files)
    if (req.files.images) {
        urls = req.files.images.map(value => `http://95.85.127.250:3002/${value.path.split('/')[8]}`)
    } else {
        urls = []
    }
    
    if (req.files.logo) {
        logo = `http://95.85.127.250:3002/${req.files.logo[0].path.split('/')[8]}`
    } else {
        logo = ''
    }

    const result = {
        imageUrl: urls,
        title: Title,
        company: Company,
        companyImage: logo,
        model: Model,
        mainDescription: Description,
        price: +Price,
        category: +category,
        subCategory: +subCategory ? subCategory : undefined
    }
    await ProductsRepo.create(result)
    return res.redirect('http://95.85.127.250:3005/products-page')
})

productsRouter.patch('/product/:id', async (req, res) => {
    await ProductsRepo.update(req.params.id, req.body)
    return res.status(200).send('Updated')
})

productsRouter.delete('/product/:id', async (req, res) => {
    await ProductsRepo.delete(req.params.id)
    return res.status(200).send('Deleted')
})
