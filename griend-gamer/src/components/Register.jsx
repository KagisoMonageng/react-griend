import React, { useState } from 'react'
import { CiCircleChevRight } from "react-icons/ci";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from 'react-router-dom';

export default function Register() {

    const [formData, setFormData] = useState({ email: '', password: '', confirm: '', fName: '', sName: '' })
    const [errors, setErrors] = useState({ email: '', password: '', fName: '', sName: '', confirm: '', tNcs: false, });
    const [formStep, setFormStep] = useState(1); //current step

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const validateForm = () => {
        let isValid = false;
        const newErrors = { email: '', password: '', fName: '', sName: '', confirm: '', tNcs: false, };

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        if (!formData.confirm) {
            newErrors.confirm = 'Password is required';
            isValid = false;
        }
        if (document.getElementById('tncs').checked) {
            newErrors.tNcs = 'T\'s and C\'s check is required';
            isValid = false;
        }




        gsap.fromTo('#confirm-error', { opacity: 0, translateY: -10 }, { opacity: 1, translateY: 0 })
        gsap.fromTo('#pass-error', { opacity: 0, translateY: -10 }, { opacity: 1, translateY: 0 })
        gsap.fromTo('#check-error', { opacity: 0, translateY: -10 }, { opacity: 1, translateY: 0 })
        setErrors(newErrors);



        if (formData.password && formData.confirm) {
            if (formData.password !== formData.confirm) {
                document.getElementById('my_modal_5').showModal()
            } else {
                isValid = true
            }
        }

        if (document.getElementById('tncs').checked) {
            newErrors.tNcs = 'T\'s and C\'s check is required';
            isValid = false;
        }
        return isValid;
    }

    const checkStep = () => {
        let isValid = true;
        const newErrors = { email: '', password: '', fName: '', sName: '', confirm: '', tNcs: false, };
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


        if (!formData.fName) {
            newErrors.fName = 'Name is required';
            isValid = false;
        }

        if (!formData.sName) {
            newErrors.sName = 'Surname is required';
            isValid = false;
        }

        gsap.fromTo('#email-error', { opacity: 0, translateY: -10 }, { opacity: 1, translateY: 0 })

        gsap.fromTo('#sName-error', { opacity: 0, translateY: -10 }, { opacity: 1, translateY: 0 })

        gsap.fromTo('#fName-error', { opacity: 0, translateY: -10 }, { opacity: 1, translateY: 0 })

        setErrors(newErrors);

        if (isValid) {
            gsap.fromTo('.animate-entry', { opacity: 1, translateX: 0 }, {
                opacity: 0, translateX: -300, ease: "power1.in", stagger: 0.1, onComplete: () => {
                    setFormStep(2)
                    setTimeout(() => {
                        gsap.fromTo('.animate-step2', { opacity: 0, translateX: 300 }, { opacity: 1, translateX: 0, ease: "power1.in", stagger: 0.1 })
                    }, 1);
                }
            })
        }
    }

    const submitFunc = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.table(formData);
        }
    }


    return (
        <div className="container px-2 flex h-screen place-items-start mx-auto pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 max-w-xl mx-auto" aria-label="layout-grid-equals">
                <div className="col self-center">
                    <div className="welcome px-6 text-center h-full ">
                        <h2 className='main-h2'>Welcome to<br />Griend</h2>
                        <p>Sign up and find your<br />next favorite game</p>
                    </div>
                </div>
                <div className="col">
                    <form onSubmit={submitFunc} className='form mx-auto'>
                        {formStep === 1 && (
                            <>
                                <div className="flex flex-col items-start gap-y-1 mb-3 animate-entry">
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

                                <div className="flex flex-col items-start gap-y-1 mb-3 animate-entry">
                                    <label htmlFor="fName" className="text-sm font-medium cursor-pointer">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="w-full p-4 bg-transparent border border-primary rounded-lg outline-none"
                                        value={formData.fName} onChange={handleChange} placeholder='Steve' name='fName'
                                    />
                                    <span className="text-error text-xs" id='fName-error'>{errors.fName}&nbsp;</span>
                                </div>

                                <div className="flex flex-col items-start gap-y-1 mb-5 animate-entry">
                                    <label htmlFor="sName" className="text-sm font-medium cursor-pointer">
                                        Surname
                                    </label>
                                    <input
                                        id="surname"
                                        type="text"
                                        className="w-full p-4 bg-transparent border border-primary rounded-lg outline-none"
                                        value={formData.sName} onChange={handleChange} placeholder='Banner' name='sName'
                                    />
                                    <span className="text-error text-xs" id='sName-error'>{errors.sName}&nbsp;</span>
                                </div>

                            </>
                        )}

                        {formStep === 2 && (
                            <>
                                <div className="flex flex-col items-start gap-y-1 mb-3 animate-step2 opacity-0">
                                    <label htmlFor="password" className="text-sm font-medium cursor-pointer">
                                        Create a password
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

                                <div className="flex flex-col items-start gap-y-1 mb-3 animate-step2 opacity-0">
                                    <label htmlFor="password" className="text-sm font-medium cursor-pointer">
                                        Confirm password
                                    </label>
                                    <input
                                        id="confirm"
                                        name='confirm'
                                        type="password"
                                        className="w-full p-4 bg-transparent border border-primary rounded-lg outline-none"
                                        placeholder="Enter your Password"
                                        value={formData.confirm} onChange={handleChange}
                                    />
                                    <span className="text-error text-xs" id='confirm-error'>{errors.confirm}&nbsp;</span>
                                </div>

                                <div className="form-control mb-5 animate-step2 opacity-0">
                                    <label className="label cursor-pointer flex-col gap-2 items-start justify-start">
                                        <input type="checkbox" className="toggle toggle-primary" id='tncs' />
                                        <span className="label-text">I understand that my information will be stored</span>
                                    </label>
                                </div>
                            </>
                        )}


                        {formStep === 1 && (
                            <button type='button' onClick={checkStep} className='btn btn-ghost w-full gap-4 animate-entry'>Next <CiCircleChevRight size={25} /></button>
                        )}
                        {formStep === 2 && <button type='submit' className='btn btn-primary w-full gap-4 animate-step2 opacity-0'>Sign up <CiCircleChevRight size={25} /></button>}
                    </form>

                    <div className="mt-10 text-center animate-entry">
                        <p>Already have an account? <Link to="/login" className='link'>Sign in</Link></p>
                    </div>

                </div>

            </div>


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Oops!</h3>
                    <p className="py-4">Passwords must match</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>
    )
}
