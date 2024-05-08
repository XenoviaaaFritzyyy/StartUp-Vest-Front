import React from 'react';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios'; // Import Axios
import '../Css/Signup.css';

function Signup() {
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const userData = {
            firstName: e.target.elements.firstName.value,
            lastName: e.target.elements.lastName.value,
            email: e.target.elements.email.value,
            contactNumber: e.target.elements.contactNumber.value,
            gender: e.target.elements.gender.value,
            password: e.target.elements.password.value
        };

        try {
            const response = await axios.post('http://localhost:3000/users/register', userData);
            console.log('Signup successful:', response.data);
            setSuccess(true); 
        } catch (error) {
            console.error('Signup failed:', error);
            setErrMsg('Signup failed. Please try again.'); 
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left-container">
            </div>

            <div className="signup-middle-container">
                <p className='Signup-Motto'>Empowering <br /> Startups,  <br /> Tracking  <br /> Investments</p>
            </div>

            <div className="signup-right-container">
                <header>Create Account</header>
                <form onSubmit={handleSubmit} className='signup-form'>
                    <div className="signup-details">
                        <div className="details-personal">
                            <div className="fields">
                                <div className="signup-input-field">
                                    <label>First Name*</label>
                                    <input type="text" name="firstName" placeholder="John" required />
                                </div>

                                <div className="signup-input-field">
                                    <label>Last Name*</label>
                                    <input type="text" name="lastName" placeholder="Doe" required />
                                </div>

                                <div className="signup-input-field address">
                                    <label>Email Address*</label>
                                    <input type="email" name="email" placeholder="johndoe@gmail.com" required />
                                </div>

                                <div className="signup-input-field">
                                    <label>Contact Number*</label>
                                    <input type="tel" name="contactNumber" placeholder="09362677352" required />
                                </div>

                                <div className="signup-input-field-select">
                                    <label>Gender*</label>
                                    <select id="gender" name="gender">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Neutral">Neutral</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="signup-input-field address">
                                    <label>Password*</label>
                                    <input type="password" name="password" placeholder="Example123" required />
                                </div>
                            </div>

                            <button type="submit" className="signup-button">Sign Up</button>

                        <div className="login">
                            <label>Already have an account? <Link to="/" className="clickable">Sign In</Link></label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Signup;