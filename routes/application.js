// routes/application.js
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


    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        // 1. Insert plant address
        // Schema: address(street, house_number, postcode, city)
        const plantAddressRes = await client.query(
            `INSERT INTO address (street, house_number, postcode, city)
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [plantAddress.street, plantAddress.houseNumber, plantAddress.postcode, plantAddress.city]
        )
        const plantAddressId = plantAddressRes.rows[0].id

        // 2. Insert company
        // Schema: companies(name, registration, address_id)
        // Note: Using plantAddressId for systemInstaller's company address as per current logic
        const companyRes = await client.query(
            `INSERT INTO companies (name, registration, address_id)
             VALUES ($1, $2, $3) RETURNING id`,
            [systemInstaller.company, systemInstaller.registrationNumber, plantAddressId]
        )
        const companyId = companyRes.rows[0].id

        // 3. Insert document
        // Schema: Documents(companies_id, system_type, e1-e7, commision_date, place, submitted_at)
        const documentRes = await client.query(
            `INSERT INTO documents (
                companies_id, system_type, e1, e2, e3, e4, e5, e6, e7,
                commision_date, place, submitted_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id`,
            [
                companyId,                                  // $1: companies_id
                systemType,                                 // $2: system_type
                attachments.applicationForm,                // $3: e1
                attachments.sitePlan,                       // $4: e2
                attachments.dataSheet,                      // $5: e3
                attachments.unitCertificates,               // $6: e4
                attachments.naProtectionCertificate,        // $7: e5
                attachments.powerFlowMonitoringCertificate, // $8: e6 (Corrected)
                attachments.overviewCircuitDiagram,         // $9: e7 (Corrected)
                plannedCommissioningDate,                   // $10: commision_date
                place,                                      // $11: place
                date                                        // $12: submitted_at
            ]
        )
        const documentId = documentRes.rows[0].id

        // Helper to insert person and assign role
        const insertPersonWithRole = async (person, role) => {
            // Schema: address(street, house_number, postcode, city)
            const addressRes = await client.query(
                `INSERT INTO address (street, house_number, postcode, city)
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                [person.street, person.houseNumber, person.postcode, person.city]
            )
            const personAddressId = addressRes.rows[0].id // Store the new address ID for the person

            // Schema: persons(first_name, last_name, email, phone_number, address_id)
            const personRes = await client.query(
                `INSERT INTO persons (first_name, last_name, email, phone_number, address_id)
                 VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                [person.firstName, person.lastName, person.email, person.phoneNumber, personAddressId]
            )

            // Schema: roles(role, persons_id, documents_id)
            await client.query(
                `INSERT INTO roles (role, persons_id, documents_id)
                 VALUES ($1, $2, $3)`,
                [role, personRes.rows[0].id, documentId] // Corrected 'person_id' to 'persons_id'
            )
        }

        // 4. Insert subscriber and plant operator
        await insertPersonWithRole(subscriber, 'subscriber')
        await insertPersonWithRole(plantOperator, 'plant_operator')

        await client.query('COMMIT')
        res.status(201).json({ message: 'Application submitted successfully!' })
    } catch (err) {
        await client.query('ROLLBACK')
        console.error("Application submission failed:", err) // Added context to error log
        res.status(500).json({ error: 'Application submission failed.' })
    } finally {
        client.release()
    }
})

export default router