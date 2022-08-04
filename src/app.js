import express from 'express'
import { userRouter } from './routers/users.js'
import { productsRouter } from './routers/products.js'
import { pagesRouter } from './routers/pages.js'
import { loginRouter } from './routers/login.js'
import { adminRouter } from './routers/admin.js'
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
            [
                '/users-page', '/user-edit', '/user-create',
                '/products-page', '/product-edit', 'product-create',
                '/admins-page', '/admin-edit', '/admin-create', '/'
            ],
            express.static('/home/rado/Codes/js_projects/admin-panel/static')
        )

        app.use(userRouter)
        app.use(productsRouter)
        app.use(pagesRouter)
        app.use(loginRouter)
        app.use(adminRouter)

        return app
    }
}