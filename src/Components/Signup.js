import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../Css/Signup.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Signup() {
    // const userRef = useRef();
    // const errRef = userRef();

    // const [user, setUser] = useState('');
    // const [validName, setValidName] = useState(false);
    // const [userFocus, setUserFocus] = useState(false);

    // const [pwd, setPwd] = useState('');
    // const [validPwd, setValidPwd] = useState(false);
    // const [pwdFocus, setPwdFocus] = useState(false);

    // const [matchPwd, setMatchPwd] = useState('');
    // const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, []);

    // useEffect(() => {
    //     const result = USER_REGEX.test(user);
    //     setValidName(result);
    // }, [user]);

    // useEffect(() => {
    //     const result = PWD_REGEX.test(pwd);
    //     setValidPwd(result);
    //     const match = pwd === matchPwd;
    //     setValidMatch(match);
    // }, [pwd, matchPwd]);

    // useEffect(() => {
    //     setErrMsg('');
    // }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Prepare user data
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
                    <div class="signup-details">
                        <div class="details-personal">
                            <div class="fields">
                                <div class="signup-input-field">
                                    <label>First Name*</label>
                                    <input type="text" name="firstName" placeholder="John" required />
                                </div>

                                <div class="signup-input-field">
                                    <label>Last Name*</label>
                                    <input type="text" name="lastName" placeholder="Doe" required />
                                </div>

                                <div class="signup-input-field address">
                                    <label>Email Address*</label>
                                    <input type="email" name="email" placeholder="johndoe@gmail.com" required />
                                </div>

                                <div class="signup-input-field">
                                    <label>Contact Number*</label>
                                    <input type="tel" name="contactNumber" placeholder="09362677352" required />
                                </div>

                                <div class="signup-input-field-select">
                                    <label>Gender*</label>
                                    <select id="gender" name="gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="neutral">Neutral</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div class="signup-input-field address">
                                    <label>Password*</label>
                                    <input type="password" name="password" placeholder="Example123" required />
                                </div>
                            </div>

                            <button type="submit" class="signup-button">Sign Up</button>

                        <div class="login">
                            <label>Already have an account? <Link to="/login" className="clickable">Sign In</Link></label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Signup;
