import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Form.scss"

const Services = require('../remoteServices/RemoteServices');



const LoginPage = () => {


  const initialValues = {
    email: "",
    password: ""
  }

  const { addToast } = useToasts();

  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token')

    if (token) {
      navigate('home')
    }

  }, [])


  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars min")
  });

  const handleSubmit = async (values) => {
    await Services.sendSignin(values).then((response) => {
      addToast('Signin Successfull', { appearance: 'success' });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user))
      navigate('home')
    })
      .catch((err) => {
        addToast("Invalid Email or Password.", { appearance: 'error' });
      })
  }

  return (
    <div className='flex justify-center p-20'>
      <div className="flex flex-col w-full max-w-md px-4 py-8  dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Sign in to Vaccine Management</h1>
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
              You don&#x27;t have an account? &nbsp; <Link className='text-blue-600' to="/register">Register</Link>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage