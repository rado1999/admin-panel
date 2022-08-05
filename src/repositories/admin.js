import { pool } from '../db.js'

export default class AdminRepo {
    static async login(login) {
        const { rows } = await pool.query(`
            SELECT * FROM "admin" WHERE login = $1`, [login]
        )
        return rows[0]
    }

    static async find(id) {
        const { rows } = await pool.query(
            'SELECT * FROM "admin" WHERE id = $1', [id]
        )
        return rows[0]
    }

    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM "admin"')
        return rows
    }

    static async create(body) {
        const { username, login, password, roleId } = body
        await pool.query(`
            INSERT INTO "admin" (username, login, password, "roleId")
            VALUES ($1, $2, $3, $4)
        `, [username, login, password, roleId])
    }

    static async update(id, body) {
        const { username, login, password, roleId } = body
        await pool.query(`
            UPDATE "admin" SET username = $1, login = $2,
            password = $3, "roleId" = $4
            WHERE id = $5
        `, [username, login, password, roleId, id])
    }

    static async delete(id) {
        await pool.query('DELETE FROM "admin" WHERE id = $1', [id])
    }
}
