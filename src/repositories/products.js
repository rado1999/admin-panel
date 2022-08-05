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
            price, category, subCategory
        } = body

        await pool.query(`
            INSERT INTO product ("imageUrl", title, company,
            "companyImage", model, "mainDescription", price,
            "categoryId", "subCategoryId")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
            imageUrl, title, company, companyImage, model, mainDescription,
            price, category, subCategory
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

    static async forEdit(id) {
        const product = await pool.query(`
            SELECT product.title, company, model, "mainDescription", price,
            category.title AS category, sub_category.title AS "subCategory"
            FROM product
            JOIN category ON category.id = product."categoryId"
            LEFT OUTER JOIN sub_category ON sub_category.id = product."subCategoryId"
            WHERE product.id = $1
        `, [id])

        const category = await pool.query(`
            SELECT category.title FROM category
        `)

        const subCategory = await pool.query(`
        SELECT sub_category.title FROM sub_category
        `)

        console.log(product.rows[0])
        
        return [product.rows[0], category.rows, subCategory.rows]
    }

    static async forCreate() {
        const category = await pool.query('SELECT id, title FROM category')
        const subCategory = await pool.query('SELECT id, title FROM sub_category')

        return [category.rows, subCategory.rows]
    }
}