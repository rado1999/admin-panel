import jwt from 'jsonwebtoken'

const { sign, verify } = jwt

const accessTime = '3000s'
const refreshTime = '6000s'

export function getTokens(id) {
    const accessToken = getToken(id, 'someSecretKey', accessTime)
    const refreshToken = getToken(id, 'anotherSecretKey', refreshTime)

    return { accessToken, refreshToken }
}

function getToken(id, key, time) {
    return sign({
        userId: id,
        randomInfo: 'afdgi18yg23c7823xpmj9235'
    }, key, { expiresIn: time })
}

export function checkToken(req, res, next) {
    try {
        const accessToken = req.headers.cookie.split('; ')[0].split('accessToken=')[1]
        verify(accessToken, 'someSecretKey', { expiresIn: accessTime })
    } catch (JsonWebTokenError) {
        try {
            const refreshToken = req.headers.cookie.split('refreshToken=')[1]
            const result = verify(
                refreshToken, 'anotherSecretKey', { expiresIn: refreshTime }
            )
            res.cookie(
                'accessToken', getToken(result.userId, 'someSecretKey', accessTime)
            )
        } catch (JsonWebTokenError) {
            return res.sendStatus(401)
        }
    }

    next()
}
