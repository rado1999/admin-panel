import { pool } from '../db.js'

export default class ProductsRepo {
    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM product')
        return rows
    }

    static async find(id) {
        const { rows } = await pool.query(
            'SELECT * FROM product WHERE id = $1', [id]
        )
        return rows[0]
    }

    static async create(body) {
        const {
            imageUrl, title, company, companyImage, model, mainDescription,
            price, categoryId, subCategoryId
        } = body
        await pool.query(`
            INSERT INTO product (id, "imageUrl", title, company,
            "companyImage", model, "mainDescription", price,
            "categoryId", "subCategoryId")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
            imageUrl, title, company, companyImage, model, mainDescription,
            price, categoryId, subCategoryId
        ])
    }

    static async update(id, body) {
        const {
            imageUrl, title, company, companyImage, model, mainDescription,
            price, categoryId, subCategoryId
        } = body
        await pool.query(`
            UPDATE product SET "imageUrl" = $1, title = $2, company = $3,
            "companyImage" = $4, model = $5, "mainDescription", price = $6,
            "categoryId" = $7, "subCategoryId" = $8
            WHERE id = $9
        `, [
            imageUrl, title, company, companyImage, model, mainDescription,
            price, categoryId, subCategoryId, id
        ])
    }

    static async delete(id) {
        return await pool.query('DELETE FROM product WHERE id = $1', [id])
    }
}