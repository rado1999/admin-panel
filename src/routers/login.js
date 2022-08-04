import { Router } from 'express'
import AdminRepo from '../repositories/admin.js'
import { getTokens } from '../utils/jwt.js'

export const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
    const { login, password } = req.body
    const result = await AdminRepo.login(login)
    if (!result || result.password !== password)
        return res.status(400).send('Invalid login or password')

    const { accessToken, refreshToken } = getTokens(result.id)

    res.cookie('accessToken', accessToken)
    res.cookie('refreshToken', refreshToken)

    return res.sendStatus(201)
})

loginRouter.delete('/', (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    return res.sendStatus(200)
})
