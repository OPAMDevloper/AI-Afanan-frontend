import React, { useState } from 'react';
import './otp.css';
import { assets } from '../../assets/assets';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

function Otp({ setShowotpModal }) {
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleChange = (value, index) => {
        if (!isNaN(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            // Move to the next input if valid
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const onOtp = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length === 4) {
            console.log('OTP Submitted:', otpValue);
            // Add OTP verification logic here
        } else {
            console.log('Invalid OTP');
        }
    };

    return (
        <div className="otp-modal">
            <form onSubmit={onOtp} className="otp-container">
                <div className="otp-header">
                    <h2>Enter OTP</h2>
                    <img
                        style={{
                            border: '2px solid #ff6347',
                            borderRadius: '25px',
                            padding: '3px',
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowotpModal(false)}
                        src={assets.crossIcon}
                        alt="Close"
                    />
                </div>
                <div className="otp-input-group">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            className="otp-input-box"
                            value={value}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            maxLength={1}
                        />
                    ))}
                </div>
                <button type="submit" className="otp-submit-button">Verify</button>
                <div className="otp-conditions">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                <p className="otp-footer">Already have an account? <span className="otp-login-link">Login here</span></p>
            </form>
            <ToastContainer />
        </div>
    );
}

Otp.propTypes = {
    setShowotpModal: PropTypes.func.isRequired,
};

export default Otp;