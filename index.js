import { App } from './src/app.js'
import { pool } from './src/db.js'

async function main() {
    const result = await pool.query('SELECT 1 + 1')

    if (!result.error) App.create().listen(3000, '192.168.31.202')

    return result.error
}

main()
