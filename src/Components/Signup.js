import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Signup.css';

function Signup() {
  return (
    <div className="signup-container">
        <div className="signup-left-container">
        </div>

        <div className="signup-middle-container">
            <p className='Signup-Motto'>Empowering <br/> Startups,  <br/> Tracking  <br/> Investments</p>
        </div>

        <div className="signup-right-container">
            <header>Create Account</header>
            <form action="#" className='signup-form'>
            <div class="signup-details">
                    <div class="details-personal">
                        <div class="fields">
                            <div class="signup-input-field">
                                <label>First Name*</label>
                                <input type="text" placeholder="John" required />
                            </div>

                            <div class="signup-input-field">
                                <label>Last Name*</label>
                                <input type="text" placeholder="Doe" required />
                            </div>

                            <div class="signup-input-field address">
                                <label>Email Address*</label>
                                <input type="email" placeholder="johndoe@gmail.com" required />
                            </div>

                            <div class="signup-input-field">
                                <label>Contact Number*</label>
                                <input type="tel" placeholder="09362677352" required />
                            </div>

                            <div class="signup-input-field-select">
                                <label>Gender*</label>
                                <select id="gender" name="gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Neutral</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div class="signup-input-field address">
                                <label>Password*</label>
                                <input type="password" placeholder="Example123" required />
                            </div>
                        </div>

                        <button type="button" class="signup-button">Sign Up</button>

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
