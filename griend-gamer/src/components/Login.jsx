import React, { useState } from 'react'
import { CiCircleChevRight } from "react-icons/ci";
import { gsap } from "gsap";
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import '../index.css'


// Functional component
const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '' });

    const router = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (formData.email) {
            if (!emailPattern.test(formData.email)) {
                newErrors.email = 'Incorrect email format';
                isValid = false;
            }
        } else {
            newErrors.email = 'Email is required';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        gsap.fromTo('#email-error',{opacity:0,translateY:-10},{opacity:1,translateY:0})
        gsap.fromTo('#pass-error',{opacity:0,translateY:-10},{opacity:1,translateY:0})
        setErrors(newErrors);
        return isValid;
    }

    const submitFunc = (e) => {
        e.preventDefault();
        if (validateForm()) {
            router("/home")
        }
    }



    return (

        <div className="container px-2 flex h-screen place-items-center mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 max-w-xl mx-auto" aria-label="layout-grid-equals">
                <div className="col self-center">
                    <div className="welcome px-6 text-center h-full ">
                        <h2 className='main-h2'>Welcome<br />Back</h2>
                        <p>Sign in and find your<br />next favorite game</p>
                    </div>
                </div>
                <div className="col">
                    <form onSubmit={submitFunc} className='form mx-auto'>
                        <div className="flex flex-col items-start gap-y-1 mb-5">
                            <label htmlFor="email" className="text-sm font-medium cursor-pointer">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                className="w-full p-4 bg-transparent border border-primary rounded-lg outline-none"
                                value={formData.email} onChange={handleChange} placeholder='Email@mail.com' name='email'
                            />
                            <span className="text-error text-xs" id='email-error'>{errors.email}&nbsp;</span>
                        </div>

                        <div className="flex flex-col items-start gap-y-1 mb-5">
                            <label htmlFor="password" className="text-sm font-medium cursor-pointer">
                                Password
                            </label>
                            <input
                                id="password"
                                name='password'
                                type="password"
                                className="w-full p-4 bg-transparent border border-primary rounded-lg outline-none"
                                placeholder="Enter your Password"
                                value={formData.password} onChange={handleChange}
                            />
                            <span className="text-error text-xs" id='pass-error'>{errors.password}&nbsp;</span>
                        </div>

                        <div className="mb-10 text-center">
                            <p>Don't have an account? <Link to="/register" className='link'>Sign up</Link></p>
                        </div>

                        <button type='submit' className='btn btn-primary w-full gap-4'>Sign in <CiCircleChevRight size={25} /></button>
                    </form>
                </div>

            </div>


        </div>


    )
}

export default Login;
