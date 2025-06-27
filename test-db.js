import pool from './db.js'

async function test() {
    try {
        const res = await pool.query('SELECT NOW()')
        console.log('Connected to database at:', res.rows[0].now)
    } catch (err) {
        console.error('DB connection error:', err)
    } finally {
        await pool.end()
    }
}

test()
