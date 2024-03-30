import '../Css/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-left-container">
        <p className='login-introduction'>Welcome Back! Please Sign Into <br/> Your <u>Startup Vest</u> Account</p>
        <p className='login-motto'>Empowering Startups, Tracking Investments</p>
      </div>

      <div className="login-right-container">
        <header className='login-header'>Sign In</header>
          <form action="#" className='login-form'>
          <div class="login-details">
                <div class="details">
                    <div class="fields">
                        <div class="login-input-field">
                            <label>Email*</label>
                            <input type="text" placeholder="example@gmail.com" required />
                        </div>

                        <div class="login-input-field">
                            <label>Password*</label>
                            <input type="password" placeholder="Example123" required />
                        </div>

                        <div class="login-forgotpass">
                            <label>Forgot password?</label>
                        </div>
                    </div>
                    <button type="button" class="login-button">Sign In</button>
                    <div class="signup">
                      <label>Don't have an account? <u className="clickable">Sign Up</u></label>
                    </div>
                </div>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Login;