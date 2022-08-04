import pg from 'pg'

export const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'project',
    user: 'postgres',
    password: '2606'
})
