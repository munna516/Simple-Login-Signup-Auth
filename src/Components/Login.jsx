import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase/firebase.init';


const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)

    const emailRef = useRef()

    const handleLogin = e => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        setErrorMessage('')
        setSuccess(false)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if (!result.user.emailVerified) {
                    setErrorMessage("Please Verify your email first")
                }
                else {
                    setSuccess(true)
                }

            })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }

    const handleForgotPassword = () => {

        const email = emailRef.current.value
        if (!email) {
            setErrorMessage("Enter Valid Email Address")

        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(result => {
                    alert("Eamil send . Please Reset Password")
                })
                .catch(error => setErrorMessage(error.message))
        }
    }
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content   rounded-lg flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className='text-center font-bold text-2xl pt-3 text-blue-700'>Login</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" ref={emailRef} name='email' placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" onClick={handleForgotPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            success && <p className='text-center font-bold text-green-400 pb-2 px-5'>Login Successfull</p>
                        }
                        {
                            errorMessage && <p className='font-bold text-center text-red-400 pb-2 px-5'>{errorMessage}</p>
                        }
                        <p className='text-center pb-4'>Don't have account? <Link className='text-blue-700 ml-3 font-bold' to='/signup'>Register</Link></p>

                    </div>
                </div>
            </div>

        </>

    );
};

export default Login;