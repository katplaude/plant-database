import express from 'express'
import pool from '../db.js'
const router = express.Router()

router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM persons')
    res.json(result.rows)
})

router.post('/', async (req, res) => {
    const { first_name, last_name, email, phone_number, address_id } = req.body
    const result = await pool.query(
        `INSERT INTO persons (first_name, last_name, email, phone_number, address_id) 
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [first_name, last_name, email, phone_number, address_id]
    )
    res.status(201).json(result.rows[0])
})

// Update
router.put('/:id', async (req, res) => {
    const { first_name, last_name, email, phone_number, address_id } = req.body
    const result = await pool.query(
        `UPDATE persons SET 
     first_name=$1, last_name=$2, email=$3, phone_number=$4, address_id=$5 
     WHERE id = $6 RETURNING *`,
        [first_name, last_name, email, phone_number, address_id, req.params.id]
    )
    res.json(result.rows[0])
})

// Delete
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM persons WHERE id = $1', [req.params.id])
    res.json({ message: 'Person deleted' })
})

export default router
