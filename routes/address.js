import express from 'express'
import pool from '../db.js'
const router = express.Router()

console.log('Address router loaded');

router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM address')
    res.json(result.rows)
})

router.post('/', async (req, res) => {
    console.log("POST /address hit!");
    console.log("Request body:", req.body); // ✅ this is crucial
    try {
        const { street, house_number, postcode, city } = req.body;
        const newAddress = await pool.query(
            'INSERT INTO address (street, house_number, postcode, city) VALUES ($1, $2, $3, $4) RETURNING *',
            [street, house_number, postcode, city]
        );
        res.json(newAddress.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.put('/:id', async (req, res) => {
    const { street, house_number, postcode, city } = req.body
    const result = await pool.query(
        `UPDATE address SET 
         street = $1, house_number = $2, postcode = $3, city = $4 
         WHERE id = $5 RETURNING *`,
        [street, house_number, postcode, city, req.params.id]
    )
    res.json(result.rows[0])
})

router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM address WHERE id = $1', [req.params.id])
    res.json({ message: 'Address deleted' })
})

export default router
