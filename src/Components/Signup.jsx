import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
const Signup = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    // Handle Google Login
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {

                navigate('/googlelogin')
            })
            .catch(error => {
                console.log(error);
            })
    }
    // Handle Github Login
    const handleGithubLogin = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {

                navigate('/githublogin')
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Handle Form Submit
    const handleSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const name = e.target.name.value
        const password = e.target.password.value
        const terms = e.target.checkbox.checked

        setSuccess(false)
        setErrorMessage('')


        if (password.length < 6) {
            setErrorMessage('Password Must Contain 6 characters')
            return
        }
        const regularExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!regularExp.test(password)) {
            setErrorMessage('Password must contain upper case,lower case, digit and special characters.')
            return
        }
        if (!terms) {
            setErrorMessage("Accept terms and conditions")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setSuccess(true)
                // email verification
                sendEmailVerification(auth.currentUser)
                    .then()
                    .catch()
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error?.message)
            })
    }
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-conten flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className='text-center font-bold text-2xl pt-3 text-blue-700'>Register</h1>
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? 'text' : "password"} name='password' placeholder="password" className="input input-bordered" required />

                                <button type="button" onClick={() => setShowPassword(!showPassword)} className='text-lg absolute top-12 right-4'>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer justify-start label">
                                    <input type="checkbox" name='checkbox' className="checkbox checkbox-success" />
                                    <span className="label-text text-blue-400 font-bold text-lg ml-3">Accept terms and conditions</span>

                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                        {
                            success && <p className='font-bold text-center text-xl text-green-400 pb-5'>Sign Up successful</p>
                        }
                        {
                            errorMessage && <p className='font-bold text-center text-red-500 pb-5'>{errorMessage}</p>
                        }
                        <div className='flex gap-3 px-4 mb-5'>
                            <button onClick={handleGoogleLogin} className='btn btn-primary'>Sign Up With <span className='text-xl text-white'><FcGoogle /></span></button>
                            <button onClick={handleGithubLogin} className='btn btn-primary'>Sign Up With <span className='text-xl text-purple-400'><VscGithub /></span></button>
                        </div>
                        <p className='text-center pb-3'>Already have account? <Link className='text-blue-700 ml-3 font-bold' to='/login'>Login</Link></p>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;