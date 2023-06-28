import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../utils/axios'
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from 'yup'
import { signupPost } from "../../utils/constants";

const initialValues = {
    email: '',
    userName: '',
    phoneNumber: '',
    password: '',
    confirm_password: ''
}
const Register = () => {
    const navigate = useNavigate()
    const SignUpSchema = yup.object({
        email: yup.string().email().required("Email Required"),
        name: yup.string().min(2).max(20).required('please enter your Actual Name '),
        userName: yup.string().min(4).max(20).required('please enter your username '),
        phoneNumber: yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
        password: yup.string().min(4).required('please Enter password'),
        confirm_password: yup.string().required().oneOf([yup.ref("password"), null], 'password must match')
    })

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values, action) => {
            handleSignUp(values)
            action.resetForm()
        }
    })

    let handleSignUp = (user) => {
        console.log(user);
        axios.post(signupPost, user).then(() => {
            navigate('/login')
        }).catch((err) => {
            ((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                });
            })(err);
        })
    }
    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f6] items-center py-32 px-4 sm:px-6 lg:px-8">
            <p className='text-xl font-extrabold'>Register</p>
            <div className="w-full max-w-md space-y-8 p-3 rounded">
                <form className="mt-8 space-y-2" onSubmit={handleSubmit}>
                    {/* <input type="hidden" name="remember" value="true"/> */}
                    <div className=" rounded-md shadow-sm">
                        <div>
                            <label htmlFor="Name" className="sr-only">Name</label>

                            <input onChange={handleChange} onClick={handleBlur} value={values.name} id="name" name="name" type="text" autoComplete="off" className=" pl-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm " placeholder="Name" />
                            {errors.name && touched.name ?
                                <p className="text-red-600">{errors.name}</p> : null
                            }
                        </div>
                        <div className='pt-2'>
                            <label htmlFor="userName" className="sr-only">User Name</label>

                            <input onChange={handleChange} onClick={handleBlur} value={values.userName} id="userName" name="userName" type="text" autoComplete="off" className=" pl-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm " placeholder="user Name" />
                            {errors.userName && touched.userName ?
                                <p className="text-red-600">{errors.userName}</p> : null
                            }
                        </div>
                        <div className='pt-2'>
                            <label htmlFor="email" className="sr-only">email</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.email} id="email" name="email" type="email" autoComplete="off" className="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="email" />
                            {errors.email && touched.email ?
                                <p className="text-red-600">{errors.email}</p> : null
                            }
                        </div>
                        <div className='pt-2'>
                            <label htmlFor="phoneNumber" className="sr-only"></label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.phoneNumber} id="phoneNumber" name="phoneNumber" type="number" autoComplete="off" className="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Phone Number" />
                            {errors.phoneNumber && touched.phoneNumber ?
                                <p className="text-red-600">{errors.phoneNumber}</p> : null
                            }
                        </div>
                        <div className='pt-2'>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.password} id="password" name="password" type="password" autoComplete="off" className="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Password" />
                            {errors.password && touched.password ?
                                <p className="text-red-600">{errors.password}</p> : null
                            }
                        </div>
                        <div className='pt-2'>
                            <label htmlFor="confirm_password" className="sr-only">confirm Password</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.confirm_password} id="confirm_password" name="confirm_password" type="password" autoComplete="off" className="pl-3 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6" placeholder="Cofirm Password" />
                            {errors.confirm_password && touched.confirm_password ?
                                <p className="text-red-600">{errors.confirm_password}</p> : null
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-sm justify-between flex ">
                            <Link to='/login'>
                                <p className="hover:font-bold text-sm px-10">Already have Account ?</p>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group   text-white relative flex w-full justify-center rounded-md bg-slate-900 py-2 text-sm font-semibold  ">
                            Sign Up
                        </button>
                        <Toaster />
                    </div>
                </form>
            </div>
        </div>

    )
}
export default Register