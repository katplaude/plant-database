import express from 'express'
import pool from '../db.js'
const router = express.Router()

// Get all documents
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM documents')
    res.json(result.rows)
})

// Get one document
router.get('/:id', async (req, res) => {
    const result = await pool.query('SELECT * FROM documents WHERE id = $1', [req.params.id])
    res.json(result.rows[0])
})

// Create a document
router.post('/', async (req, res) => {
    const { companies_id, system_type, e1, e2, e3, e4, e5, e6, e7, commision_date, place, submitted_at } = req.body
    const result = await pool.query(
        `INSERT INTO documents 
     (companies_id, system_type, e1, e2, e3, e4, e5, e6, e7, commision_date, place, submitted_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
        [companies_id, system_type, e1, e2, e3, e4, e5, e6, e7, commision_date, place, submitted_at]
    )
    res.status(201).json(result.rows[0])
})

// Update
router.put('/:id', async (req, res) => {
    const { companies_id, system_type, e1, e2, e3, e4, e5, e6, e7, commision_date, place, submitted_at } = req.body
    const result = await pool.query(
        `UPDATE documents SET 
     companies_id=$1, system_type=$2, e1=$3, e2=$4, e3=$5, e4=$6, e5=$7, e6=$8, e7=$9,
     commision_date=$10, place=$11, submitted_at=$12
     WHERE id = $13 RETURNING *`,
        [companies_id, system_type, e1, e2, e3, e4, e5, e6, e7, commision_date, place, submitted_at, req.params.id]
    )
    res.json(result.rows[0])
})

// Delete
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM documents WHERE id = $1', [req.params.id])
    res.json({ message: 'Document deleted' })
})


export default router
