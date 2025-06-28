import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const {
        plantAddress,
        subscriber,
        plantOperator,
        systemInstaller,
        systemType,
        attachments,
        plannedCommissioningDate,
        place,
        date
    } = req.body

    // --- START Backend Request Debug ---
    console.log("--- START ---");
    console.log("Full req.body received:", JSON.stringify(req.body, null, 2));
    console.log("--- END  ---");
    // --- END Debugging ---

    const client = await pool.connect()

    try {
        await client.query('BEGIN')


        const plantAddressRes = await client.query(
            `INSERT INTO address (street, house_number, postcode, city)
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [plantAddress.street, plantAddress.houseNumber, plantAddress.postcode, plantAddress.city]
        )
        const plantAddressId = plantAddressRes.rows[0].id

        const companyRes = await client.query(
            `INSERT INTO companies (name, registration, address_id)
             VALUES ($1, $2, ($3)::integer) RETURNING id`, // Ensure address_id is cast to integer if not explicitly defined as such
            [systemInstaller.company, systemInstaller.registrationNumber, plantAddressId]
        )
        const companyId = companyRes.rows[0].id

        const documentRes = await client.query(
            `INSERT INTO documents (
                companies_id, system_type, e1, e2, e3, e4, e5, e6, e7,
                commision_date, place, submitted_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id`,
            [
                companyId,
                systemType,
                attachments.applicationForm,
                attachments.sitePlan,
                attachments.dataSheet,
                attachments.unitCertificates,
                attachments.naProtectionCertificate,
                attachments.powerFlowMonitoringCertificate,
                attachments.overviewCircuitDiagram,
                plannedCommissioningDate,
                place,
                date
            ]
        )
        const documentId = documentRes.rows[0].id

        const insertPersonWithRole = async (personDetails, role) => {
            const addressRes = await client.query(
                `INSERT INTO address (street, house_number, postcode, city)
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                [personDetails.street, personDetails.houseNumber, personDetails.postcode, personDetails.city]
            )
            const personAddressId = addressRes.rows[0].id

            const personRes = await client.query(
                `INSERT INTO persons (first_name, last_name, email, phone_number, address_id)
                 VALUES ($1, $2, $3, $4, ($5)::integer) RETURNING id`,
                [personDetails.firstName, personDetails.lastName, personDetails.email, personDetails.telephone, personAddressId]
            )

            await client.query(
                `INSERT INTO roles (role, persons_id, documents_id)
                 VALUES ($1, ($2)::integer, ($3)::integer)`,
                [role, personRes.rows[0].id, documentId]
            )
        }


        await insertPersonWithRole(plantAddress, 'plant_address')

        await insertPersonWithRole(subscriber, 'subscriber')

        await insertPersonWithRole(plantOperator, 'plant_operator')

        await client.query('COMMIT')
        res.status(201).json({ message: 'Application submitted successfully!' })
    } catch (err) {
        await client.query('ROLLBACK')
        console.error("Application submission failed:", err)
        res.status(500).json({ error: 'Application submission failed.' })
    } finally {
        client.release()
    }
})

export default router;