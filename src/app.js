import express from 'express'
import { userRouter } from './routers/users.js'
import { productsRouter } from './routers/products.js'
import { pagesRouter } from './routers/pages.js'
import { cors } from './cors.js'
import { prompt } from '../logging/prompt.js'

export class App {
    static create() {
        const app = express()
        app.use(express.json())
        app.use(cors)
        app.use(prompt)

        app.set('view engine', 'ejs')
        app.use(
            '/',
            express.static('/home/rado/Codes/js_projects/admin/static')
        )

        app.use(userRouter)
        app.use(productsRouter)
        app.use(pagesRouter)

        return app
    }
}