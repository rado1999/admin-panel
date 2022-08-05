import { App } from './src/app.js'
import { pool } from './src/db.js'

async function main() {
    const result = await pool.query('SELECT 1 + 1')

    if (!result.error) App.create().listen(3005, '95.85.127.250')

    return result.error
}

main()
