import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Register = () => {
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [email, setemail] = useState('')
    const [pwd, setpwd] = useState('')
    const navigate = useNavigate()

    const validateInputs = () => {
        // Check if any field is empty
        if (!fname || !lname || !email || !pwd) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please fill in all fields',
                confirmButtonText: 'OK'
            })
            return false
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
                confirmButtonText: 'OK'
            })
            return false
        }

        // Validate password strength (at least 6 characters)
        if (pwd.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Weak Password',
                text: 'Password must be at least 6 characters long',
                confirmButtonText: 'OK'
            })
            return false
        }

        return true
    }

    const submit = async () => {
        // Validate inputs before submission
        if (!validateInputs()) {
            return
        }

        const data = { fname, lname, email, pwd }
        try {
            const res = await fetch("https://ecom-2-dmmb.onrender.com/api/register", {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
            })
            
            if (res.ok) {
                const result = await res.json()
                if (result.statuscode === 1) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'You have successfully registered!',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    navigate("/login" ,{state:{fname}})
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: result.message || 'Error occurred during registration',
                        confirmButtonText: 'OK'
                    })
                }
            } else {
                const errorData = await res.json()
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: errorData.message || 'Error occurred during registration',
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Unable to connect to the server',
                confirmButtonText: 'OK'
            })
        }
    }

    return (
        <div>
            <div className="breadcrumb-section">
                <div className="container">
                    <h2>Create account</h2>
                    <nav className="theme-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item active">Create account</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <section className="login-page section-b-space">
                <div className="container">
                    <h3>create account</h3>
                    <div className="theme-card">
                        <div className="theme-form">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-box">
                                        <label htmlFor="fname" className="form-label">First Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="fname" 
                                            placeholder="First Name" 
                                            required 
                                            value={fname}
                                            onChange={(e) => setfname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-box">
                                        <label htmlFor="lname" className="form-label">Last Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="lname" 
                                            placeholder="Last Name"
                                            required 
                                            value={lname}
                                            onChange={(e) => setlname(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-box">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            placeholder="Email" 
                                            required 
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-box">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password"
                                            placeholder="Enter your password" 
                                            required 
                                            value={pwd}
                                            onChange={(e) => setpwd(e.target.value)}
                                        />
                                        <small className="form-text text-muted">
                                            Password must be at least 6 characters
                                        </small>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button onClick={submit}
                                    className="btn btn-solid w-auto">Create Account</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register