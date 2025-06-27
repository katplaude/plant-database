import express from 'express'
import pool from './db.js'  // your postgres pool setup

const index = express()
const PORT = 3000

index.use(express.json())  // to parse JSON bodies

// Simple test route to check server is running
index.get('/', (req, res) => {
    res.send('Plant Database API is running')
})

index.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
