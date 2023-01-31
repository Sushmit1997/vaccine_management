import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useToasts } from 'react-toast-notifications';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Form.scss"


const Services = require('../remoteServices/RemoteServices');

const RegisterPage = () => {

  const [registerData, setRegisterData] = useState({
    email: '',
    password: ''
  })

  const { addToast } = useToasts();
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmpassword: ""
  }

  const registerSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmpassword: Yup.string().required("Re-enter your password").when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
  })

  useEffect(() => {
    let token = localStorage.getItem('token')

    if (token) {
      navigate('home')
    }

  }, [])


  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password
    }
    await Services.sendSignup(payload).then((response) => {
      addToast('Register Successfull.', { appearance: 'success' });
      navigate('/')
    })
      .catch((error) => {
        addToast('Registration failed.', { appearance: 'error' });
      })
  }

  return (
    <div className='flex justify-center p-20'>
       <div className="flex flex-col w-full max-w-md px-4 py-8  dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Register to Vaccine Management</h1>
            <Form>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>
              <div className="form-row">
                <label htmlFor="password">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="confirmpassword"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
        <div className="flex items-center justify-center mt-6">
          <a href="#" target="_blank" className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
            <span className="ml-2 text-black">
             Already have an account? &nbsp; <Link className='text-blue-600' to="/">Sign In</Link>
            </span>
          </a>
        </div>
      </div>

    </div>
  )
}

export default RegisterPage