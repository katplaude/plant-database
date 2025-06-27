import express from 'express'
import cors from 'cors'
import applicationRouter from './routes/application.js'
import documentsRouter from './routes/documents.js'
import personsRouter from './routes/persons.js'
import rolesRouter from './routes/roles.js'
import companiesRouter from './routes/companies.js'
import addressRouter from './routes/address.js'

const app = express()
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use('/application', applicationRouter)
app.use('/documents', documentsRouter)
app.use('/persons', personsRouter)
app.use('/roles', rolesRouter)
app.use('/companies', companiesRouter)
app.use('/address', addressRouter)
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});