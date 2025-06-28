import React, { useState } from 'react';
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
    Paper,
    Grid,
    Box,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function ApplicationForm() {
    const [formData, setFormData] = useState({
        plantAddress: {
            firstName: '', lastName: '', street: '', houseNumber: '', postcode: '', city: '', telephone: '', email: ''
        },
        subscriber: {
            firstName: '', lastName: '', street: '', houseNumber: '', postcode: '', city: '', telephone: '', email: ''
        },
        plantOperator: {
            firstName: '', lastName: '', street: '', houseNumber: '', postcode: '', city: '', telephone: '', email: ''
        },
        systemInstaller: {
            company: '', place: '', registrationNumber: ''
        },
        systemType: 'new',
        attachments: {
            applicationForm: false, sitePlan: false, dataSheet: false, unitCertificates: false,
            naProtectionCertificate: false, powerFlowMonitoringCertificate: false, overviewCircuitDiagram: false
        },
        plannedCommissioningDate: null,
        place: '',
        date: null,
        signature: ''
    });

    const handleChange = (section, field) => e => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleCheckboxChange = (section, field) => e => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: e.target.checked
            }
        }));
    };

    const handleSimpleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (field) => (dateValue) => {
        setFormData(prev => ({
            ...prev,
            [field]: dateValue ? dayjs(dateValue).format('YYYY-MM-DD') : null // Ensure dayjs(dateValue) is called
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
                const errorData = await response.json();
                throw new Error(`Error: ${response.status} - ${errorData.error || response.statusText}`);
            }

            const result = await response.json();
            console.log('Submission successful:', result);
            alert('Application submitted successfully!');
            // Optionally clear the form or reset state here
        } catch (error) {
            console.error('Submission failed:', error);
            alert(`Submission failed: ${error.message}`);
        }
    };

    const renderPersonSection = (title, sectionName) => (
        <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid #e0e0e0' }}> {/* Subtle border instead of strong shadow */}
            <Typography variant="h5" component="h2" gutterBottom>{title}</Typography>
            <Grid container spacing={3}> {/* Increased spacing */}
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" name="firstName"
                               value={formData[sectionName].firstName} onChange={handleChange(sectionName, 'firstName')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last Name" name="lastName"
                               value={formData[sectionName].lastName} onChange={handleChange(sectionName, 'lastName')} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField fullWidth label="Street" name="street"
                               value={formData[sectionName].street} onChange={handleChange(sectionName, 'street')} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="House Number" name="houseNumber"
                               value={formData[sectionName].houseNumber} onChange={handleChange(sectionName, 'houseNumber')} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Postcode" name="postcode"
                               value={formData[sectionName].postcode} onChange={handleChange(sectionName, 'postcode')} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField fullWidth label="City" name="city"
                               value={formData[sectionName].city} onChange={handleChange(sectionName, 'city')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Telephone" name="telephone" type="tel"
                               value={formData[sectionName].telephone} onChange={handleChange(sectionName, 'telephone')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email" name="email" type="email"
                               value={formData[sectionName].email} onChange={handleChange(sectionName, 'email')} />
                </Grid>
            </Grid>
        </Paper>
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 900, mx: 'auto', bgcolor: 'background.default', borderRadius: 2 }}> {/* Main container styling */}
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Plant Database Application Form
                </Typography>

                <form onSubmit={handleSubmit}>
                    {renderPersonSection('Plant Address', 'plantAddress')}
                    {renderPersonSection('Subscriber (Owner)', 'subscriber')}
                    {renderPersonSection('Plant Operator', 'plantOperator')}

                    <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                        <Typography variant="h5" component="h2" gutterBottom>System Installer (Specialist electrical company)</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Company" name="company"
                                           value={formData.systemInstaller.company} onChange={handleChange('systemInstaller', 'company')} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Place" name="place"
                                           value={formData.systemInstaller.place} onChange={handleChange('systemInstaller', 'place')} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Registration Number with network operator" name="registrationNumber"
                                           value={formData.systemInstaller.registrationNumber} onChange={handleChange('systemInstaller', 'registrationNumber')} />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                        <Typography variant="h5" component="h2" gutterBottom>System Type</Typography>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend" sx={{ mb: 1 }}>Choose System Type</FormLabel>
                            <RadioGroup row name="systemType" value={formData.systemType} onChange={handleSimpleChange}>
                                <FormControlLabel value="new" control={<Radio />} label="New construction" />
                                <FormControlLabel value="extension" control={<Radio />} label="Extension" />
                                <FormControlLabel value="dismantling" control={<Radio />} label="Dismantling" />
                            </RadioGroup>
                        </FormControl>
                    </Paper>

                    <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                        <Typography variant="h5" component="h2" gutterBottom>Attachments</Typography>
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox checked={formData.attachments.applicationForm} onChange={handleCheckboxChange('attachments', 'applicationForm')} />
                            } label="Application form 'Application for grid connection' enclosed" />

                            <FormControlLabel control={
                                <Checkbox checked={formData.attachments.sitePlan} onChange={handleCheckboxChange('attachments', 'sitePlan')} />
                            } label="Site plan with designation and boundaries of the property attached" />

                            <FormControlLabel control={
                                <Checkbox checked={formData.attachments.dataSheet} onChange={handleCheckboxChange('attachments', 'dataSheet')} />
                            } label="Data sheet for generating plant attached (form E.2)" />

                            <FormControlLabel control={
                                <Checkbox checked={formData.attachments.unitCertificates} onChange={handleCheckboxChange('attachments', 'unitCertificates')} />
                            } label="Unit certificates (VDE-AR-N 4105 or VDE-AR-N 4110)" />

                            <FormControlLabel control={
                                <Checkbox checked={formData.attachments.naProtectionCertificate} onChange={handleCheckboxChange('attachments', 'naProtectionCertificate')} />
                            } label="Certificate for NA protection (form E.6)" />

                            <FormControlLabel control={
                                <Checkbox checked={formData.attachments.powerFlowMonitoringCertificate} onChange={handleCheckboxChange('attachments', 'powerFlowMonitoringCertificate')} />
                            } label="Certificate for power flow monitoring at grid connection point" />

                            <FormControlLabel control={
                                <Checkbox checked={formData.attachments.overviewCircuitDiagram} onChange={handleCheckboxChange('attachments', 'overviewCircuitDiagram')} />
                            } label="Overview circuit diagram from grid connection attached" />
                        </FormGroup>
                    </Paper>

                    <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                        <Typography variant="h5" component="h2" gutterBottom>Planned Commissioning Date</Typography>
                        <DatePicker
                            label="Select Date"
                            value={formData.plannedCommissioningDate ? dayjs(formData.plannedCommissioningDate) : null}
                            onChange={handleDateChange('plannedCommissioningDate')}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </Paper>

                    <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                        <Typography variant="h5" component="h2" gutterBottom>Place, Date, Signature</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Place" name="place"
                                           value={formData.place} onChange={handleSimpleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    label="Date"
                                    value={formData.date ? dayjs(formData.date) : null}
                                    onChange={handleDateChange('date')}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Signature" name="signature"
                                           value={formData.signature} onChange={handleSimpleChange} />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                        Submit Application
                    </Button>
                </form>
            </Box>
        </LocalizationProvider>
    );
}

export default ApplicationForm;