// src/Components/RegistrationOptions/RegistrationOptions.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './RegistrationOptions.css'; // Create a CSS file for styling

const RegistrationOptions = () => {
    const history = useHistory();

    const handleFarmerRegistration = () => {
        history.push('/register'); // Route to farmer registration
    };

    const handleCustomerRegistration = () => {
        history.push('/customerregistration'); // Route to customer registration
    };

    return (
        <div className="registration-options">
            <h1>Choose Registration Type</h1>
            <div className="registration-option" onClick={handleFarmerRegistration}>
                <h2>Farmer Registration</h2>
            </div>
            <div className="registration-option" onClick={handleCustomerRegistration}>
                <h2>Customer Registration</h2>
            </div>
        </div>
    );
};

export default RegistrationOptions;