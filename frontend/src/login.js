import React, { useContext, useState } from 'react';
import context from './usecontext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Login } from './reducer/userslice';

const Loginp = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [param] = useSearchParams();
  const id = param.get("idd");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUsertype } = useContext(context); // for header update

  const validate = () => {
    const errors = {};

    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!pwd) {
      errors.pwd = "Please enter your password.";
    }

    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: `<ul style="text-align: left;">
                ${Object.values(errors).map(err => `<li>${err}</li>`).join('')}
               </ul>`
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("https://ecom-new-2-6hu0.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pwd }),
      });

      const result = await response.json();

      if (response.ok && result.statuscode === 1) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          timer: 2000,
          showConfirmButton: false,
        });

        // Dispatch with full userdata including userid
        dispatch(Login({
          email: result.userdata.email,
          userid: result.userdata.userid,
            firstname: result.userdata.firstname,
  usertype: result.usertype    
         
        
        }));

        // Save sessionStorage for persistence
        sessionStorage.setItem("userinfo", JSON.stringify(result.userdata));
        sessionStorage.setItem("token", result.authtoken);

        setUsertype(result.usertype);

        // Clear password for security (optional)
        setPwd('');

        // Redirect after login
        if (id) {
          navigate(`/productdetails?id=${id}`);
        } else if (result.usertype === "Admin") {
          navigate("/home");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: result.message || 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An error occurred during login. Please try again.',
      });
    }
  };

  return (
    <div>
      <section className="login-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3>Login</h3>
              <div className="theme-card">
                <div className="theme-form">
                  <form onSubmit={handleLogin}>
                    <div className="form-box">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-box">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-solid">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6>Create An Account</h6>
                <p>
                  Sign up for a free account at our store. Registration is quick and easy.
                  To start shopping click register.
                </p>
                <Link to="/register" className="btn btn-solid">Create an Account</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loginp;
