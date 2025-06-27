import express from 'express'
import pool from '../db.js'
const router = express.Router()

router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM roles')
    res.json(result.rows)
})

router.post('/', async (req, res) => {
    const { role, persons_id, documents_id } = req.body
    const result = await pool.query(
        `INSERT INTO roles (role, persons_id, documents_id) 
     VALUES ($1,$2,$3) RETURNING *`,
        [role, persons_id, documents_id]
    )
    res.status(201).json(result.rows[0])
})

// Update
router.put('/:id', async (req, res) => {
    const { role, persons_id, documents_id } = req.body
    const result = await pool.query(
        `UPDATE roles SET 
     role=$1, persons_id=$2, documents_id=$3 
     WHERE id = $4 RETURNING *`,
        [role, persons_id, documents_id, req.params.id]
    )
    res.json(result.rows[0])
})

// Delete
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM roles WHERE id = $1', [req.params.id])
    res.json({ message: 'Role deleted' })
})

export default router
