import { pool } from '../db.js'

export default class UsersRepo {
    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM "user"')
        return rows
    }

    static async find(id) {
        const { rows } = await pool.query(
            'SELECT * FROM "user" WHERE id = $1', [id]
        )
        return rows[0]
    }

    static async create(email, phone, name) {
        await pool.query(`
            INSERT INTO "user" (email, phone, name)
            VALUES ($1, $2, $3)
        `, [email, phone, name])
    }

    static async update(id, email, phone, name) {
        await pool.query(`
            UPDATE "user" SET email = $1, phone = $2, name = $3
            WHERE id = $4
        `, [email, phone, name, id])
    }

    static async delete(id) {
        await pool.query('DELETE FROM "user" WHERE id = $1', [id])
    }
}