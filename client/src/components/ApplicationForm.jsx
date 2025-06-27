import React, { useState } from 'react';

function ApplicationForm() {
    const [formData, setFormData] = useState({
        plantAddress: {
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            postcode: '',
            city: '',
            telephone: '',
            email: ''
        },
        subscriber: {
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            postcode: '',
            city: '',
            telephone: '',
            email: ''
        },
        plantOperator: {
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            postcode: '',
            city: '',
            telephone: '',
            email: ''
        },
        systemInstaller: {
            company: '',
            place: '',
            registrationNumber: ''
        },
        systemType: '', // 'new', 'extension', 'dismantling'
        attachments: {
            applicationForm: false,
            sitePlan: false,
            dataSheet: false,
            unitCertificates: false,
            naProtectionCertificate: false,
            powerFlowMonitoringCertificate: false,
            overviewCircuitDiagram: false
        },
        plannedCommissioningDate: '',
        place: '',
        date: '',
        signature: ''
    });

    // Handle input change for nested fields
    const handleChange = (section, field) => e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Handle simple fields (systemType, place, date, signature)
    const handleSimpleChange = (field) => e => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Submitting:', formData);

        try {
            const response = await fetch('http://localhost:3000/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Submission successful:', result);

            // Optionally clear the form or show success message
            // setFormData(...initialState)
            // alert('Submitted successfully!');
        } catch (error) {
            console.error('Submission failed:', error);
            // alert('Failed to submit application');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Plant Address</h2>
            <input name="firstName" placeholder="First Name" value={formData.plantAddress.firstName} onChange={handleChange('plantAddress', 'firstName')} />
            <input name="lastName" placeholder="Last Name" value={formData.plantAddress.lastName} onChange={handleChange('plantAddress', 'lastName')} />
            <input name="street" placeholder="Street" value={formData.plantAddress.street} onChange={handleChange('plantAddress', 'street')} />
            <input name="houseNumber" placeholder="House Number" value={formData.plantAddress.houseNumber} onChange={handleChange('plantAddress', 'houseNumber')} />
            <input name="postcode" placeholder="Postcode" value={formData.plantAddress.postcode} onChange={handleChange('plantAddress', 'postcode')} />
            <input name="city" placeholder="City" value={formData.plantAddress.city} onChange={handleChange('plantAddress', 'city')} />
            <input name="telephone" placeholder="Telephone" value={formData.plantAddress.telephone} onChange={handleChange('plantAddress', 'telephone')} />
            <input name="email" placeholder="Email" type="email" value={formData.plantAddress.email} onChange={handleChange('plantAddress', 'email')} />

            <h2>Subscriber (Owner)</h2>
            {/* Repeat inputs like Plant Address but for subscriber */}
            <input name="firstName" placeholder="First Name" value={formData.subscriber.firstName} onChange={handleChange('subscriber', 'firstName')} />
            <input name="lastName" placeholder="Last Name" value={formData.subscriber.lastName} onChange={handleChange('subscriber', 'lastName')} />
            <input name="street" placeholder="Street" value={formData.subscriber.street} onChange={handleChange('subscriber', 'street')} />
            <input name="houseNumber" placeholder="House Number" value={formData.subscriber.houseNumber} onChange={handleChange('subscriber', 'houseNumber')} />
            <input name="postcode" placeholder="Postcode" value={formData.subscriber.postcode} onChange={handleChange('subscriber', 'postcode')} />
            <input name="city" placeholder="City" value={formData.subscriber.city} onChange={handleChange('subscriber', 'city')} />
            <input name="telephone" placeholder="Telephone" value={formData.subscriber.telephone} onChange={handleChange('subscriber', 'telephone')} />
            <input name="email" placeholder="Email" type="email" value={formData.subscriber.email} onChange={handleChange('subscriber', 'email')} />

            <h2>Plant Operator</h2>
            {/* Same pattern */}
            <input name="firstName" placeholder="First Name" value={formData.plantOperator.firstName} onChange={handleChange('plantOperator', 'firstName')} />
            <input name="lastName" placeholder="Last Name" value={formData.plantOperator.lastName} onChange={handleChange('plantOperator', 'lastName')} />
            <input name="street" placeholder="Street" value={formData.plantOperator.street} onChange={handleChange('plantOperator', 'street')} />
            <input name="houseNumber" placeholder="House Number" value={formData.plantOperator.houseNumber} onChange={handleChange('plantOperator', 'houseNumber')} />
            <input name="postcode" placeholder="Postcode" value={formData.plantOperator.postcode} onChange={handleChange('plantOperator', 'postcode')} />
            <input name="city" placeholder="City" value={formData.plantOperator.city} onChange={handleChange('plantOperator', 'city')} />
            <input name="telephone" placeholder="Telephone" value={formData.plantOperator.telephone} onChange={handleChange('plantOperator', 'telephone')} />
            <input name="email" placeholder="Email" type="email" value={formData.plantOperator.email} onChange={handleChange('plantOperator', 'email')} />

            <h2>System Installer (Specialist electrical company)</h2>
            <input name="company" placeholder="Company" value={formData.systemInstaller.company} onChange={handleChange('systemInstaller', 'company')} />
            <input name="place" placeholder="Place" value={formData.systemInstaller.place} onChange={handleChange('systemInstaller', 'place')} />
            <input name="registrationNumber" placeholder="Registration Number with network operator" value={formData.systemInstaller.registrationNumber} onChange={handleChange('systemInstaller', 'registrationNumber')} />

            <h2>System Type</h2>
            <label>
                <input type="radio" name="systemType" value="new" checked={formData.systemType === 'new'} onChange={handleSimpleChange('systemType')} />
                New construction
            </label>
            <label>
                <input type="radio" name="systemType" value="extension" checked={formData.systemType === 'extension'} onChange={handleSimpleChange('systemType')} />
                Extension
            </label>
            <label>
                <input type="radio" name="systemType" value="dismantling" checked={formData.systemType === 'dismantling'} onChange={handleSimpleChange('systemType')} />
                Dismantling
            </label>

            <h2>Attachments</h2>
            <label>
                <input type="checkbox" checked={formData.attachments.applicationForm} onChange={handleChange('attachments', 'applicationForm')} />
                Application form "Application for grid connection" enclosed
            </label>
            <label>
                <input type="checkbox" checked={formData.attachments.sitePlan} onChange={handleChange('attachments', 'sitePlan')} />
                Site plan with designation and boundaries of the property attached
            </label>
            <label>
                <input type="checkbox" checked={formData.attachments.dataSheet} onChange={handleChange('attachments', 'dataSheet')} />
                Data sheet for generating plant attached (form E.2)
            </label>
            <label>
                <input type="checkbox" checked={formData.attachments.unitCertificates} onChange={handleChange('attachments', 'unitCertificates')} />
                Unit certificates (VDE-AR-N 4105 or VDE-AR-N 4110)
            </label>
            <label>
                <input type="checkbox" checked={formData.attachments.naProtectionCertificate} onChange={handleChange('attachments', 'naProtectionCertificate')} />
                Certificate for NA protection (form E.6)
            </label>
            <label>
                <input type="checkbox" checked={formData.attachments.powerFlowMonitoringCertificate} onChange={handleChange('attachments', 'powerFlowMonitoringCertificate')} />
                Certificate for power flow monitoring at grid connection point
            </label>
            <label>
                <input type="checkbox" checked={formData.attachments.overviewCircuitDiagram} onChange={handleChange('attachments', 'overviewCircuitDiagram')} />
                Overview circuit diagram from grid connection attached
            </label>

            <h2>Planned Commissioning Date</h2>
            <input type="date" value={formData.plannedCommissioningDate} onChange={handleSimpleChange('plannedCommissioningDate')} />

            <h2>Place, Date, Signature</h2>
            <input placeholder="Place" value={formData.place} onChange={handleSimpleChange('place')} />
            <input type="date" value={formData.date} onChange={handleSimpleChange('date')} />
            <input placeholder="Signature" value={formData.signature} onChange={handleSimpleChange('signature')} />

            <button type="submit">Submit Application</button>
        </form>
    );
}

export default ApplicationForm;
