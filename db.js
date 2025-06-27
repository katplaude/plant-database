import { Pool } from 'pg'

const pool = new Pool({
    user: 'admin',
    password: 'admin',
    host: 'localhost',
    port: 5433,
    database: 'form_e1_project'
})

export default pool
