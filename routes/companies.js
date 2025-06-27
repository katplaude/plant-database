import express from 'express'
import pool from '../db.js'
const router = express.Router()

// GET all companies
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM companies')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// POST create a new company
router.post('/', async (req, res) => {
    const { name, registration, phone, email, address_id } = req.body
    try {
        const result = await pool.query(
            `INSERT INTO companies (name, registration, phone, email, address_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, registration, phone, email, address_id]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// PUT update company by id
router.put('/:id', async (req, res) => {
    const { name, registration, phone, email, address_id } = req.body
    try {
        const result = await pool.query(
            `UPDATE companies SET 
       name = $1, registration = $2, phone = $3, email = $4, address_id = $5 
       WHERE id = $6 RETURNING *`,
            [name, registration, phone, email, address_id, req.params.id]
        )
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// DELETE company by id
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM companies WHERE id = $1', [req.params.id])
        res.json({ message: 'Company deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
