
import { useEffect, useState } from "react"
import { useToasts } from "react-toast-notifications";
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig } from "../utils/fileValidation";

import { avatar } from "../assets"

import "./vaccineForm.scss"

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const isImage = require('../utils/isImage')
const Services = require('../remoteServices/RemoteServices');

const VaccineForm = ({ action, vaccine, handleActionSuccess }) => {
  const address = 'http://localhost:5000'
  // const address = process.env.REACT_APP_API_URL
  const [imagePreview, setImagePreview] = useState(address + "/" + vaccine?.image)

  const formData = {
    name: vaccine.name,
    company_email: vaccine.company_email,
    company_contact: vaccine.company_contact,
    number_of_dose: vaccine.number_of_dose,
    image: vaccine.image,
    gender: vaccine.gender
  }

  useEffect(() => {
    action === 'add' && setImagePreview(avatar)
  }, [])


  const { addToast } = useToasts();


  const handleImageSelect = (e, setFieldValue) => {
    let fileName = e.target.files[0].name
    let file = e.target.files[0]
    if (isImage(fileName)) {
      setFieldValue('image', file)
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    } else {
      addToast('Wrong file format!', {appearance: 'error'})
    }
  }

  const vaccineSchema = Yup.object().shape({
    name: Yup.string().required("Vaccine name is required"),
    company_email : Yup.string().email("Invalid Email").required("Email required"),
    company_contact: Yup.string().required("Contact number is required"),
    number_of_dose: Yup.number().required("Number of doses is required"),
    image: Yup.string().required(""),
    gender: Yup.string().required("Gender is required.")
  });


  const handleFormSubmit = (values) => {

    const data = new FormData()
    data.append('image', values.image)
    data.append('name', values.name)
    data.append('company_email', values.company_email)
    data.append('company_contact', values.company_contact)
    data.append('number_of_dose', values.number_of_dose)
    data.append('gender',values.gender)


    action === 'add' ?
      Services.addVaccine(data).then((res) => {
        handleActionSuccess()
        addToast('Vaccine added.', { appearance: 'success' });
      }).catch((err) => {
        addToast('Failed', { appearance: 'error' });
      }) :
      Services.updateVaccine(data, vaccine._id).then((res) => {
        handleActionSuccess()
        addToast('Vaccine updated.', { appearance: 'success' });
      }).catch((err) => {
        addToast('Failed', { appearance: 'error' });
      })


  }


  return (
    <div>
      <div className="flex  w-full max-w px-4 py-8  dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <Formik
      initialValues={formData}
      validationSchema={vaccineSchema}
      onSubmit={(values) => {
        handleFormSubmit(values)
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty, setFieldValue, values } = formik;
        return (
          <div className="container-vaccine">
            <Form>
            <div className="flex-column justify-center">
                <div className="photo-wrapper p-2">
                  <img className="w-32 h-32 rounded-full mx-auto" src={imagePreview} alt="Profile"></img>
                </div>
                <input  id="files" className=" hidden ml-[100px] mt-5 bg-blue-500 capitalize hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded justify-end" onChange={(e) => handleImageSelect(e, setFieldValue)} accept="png/jpeg" type="file">
                </input>
                <label className="block w-1/2 m-auto text-center mt-5 text-lg uppercase tracking-wide text-white-important pointer  font-bold mb-2 pointer bg-blue-500 capitalize hover:bg-blue-700 font-bold py-2 px-4 add-image-label " for="files" >{action === 'add' ? 'Add Image' : 'Change Image'}&nbsp;<span>*</span> </label>
                <ErrorMessage name="image" component="span" className="error" />
            </div>
                  <div className="form-row">
                    <label htmlFor="name">Vaccine name: </label>
                    <Field
                      type="name"
                      name="name"
                      id="name"
                      className={
                        errors.name && touched.name ? "input-error" : null
                      }
                    />
                    <ErrorMessage name="name" component="span" className="error" />
                  </div>

                    <div className="form-row">
                      <label htmlFor="company_email">Company Email: </label>
                      <Field
                        type="company_email"
                        name="company_email"
                        id="company_email"
                        className={
                          errors.company_email && touched.company_email ? "input-error" : null
                        }
                      />
                      <ErrorMessage
                        name="company_email"
                        component="span"
                        className="error"
                      />
                    </div>
                  <div className="form-row">
                    <label htmlFor="company_contact">Company Contact Number: </label>
                    <Field
                      type="company_contact"
                      name="company_contact"
                      id="company_contact"
                      className={
                        errors.company_contact && touched.company_contact ? "input-error" : null
                      }
                    />
                    <ErrorMessage name="company_contact" component="span" className="error" />
                  </div>
                  <div className="form-row">
                    <label htmlFor="number_of_dose"> Number of dose: </label>
                    <Field
                      type="number_of_dose"
                      name="number_of_dose"
                      id="number_of_dose"
                      className={
                        errors.number_of_dose && touched.number_of_dose ? "input-error" : null
                      }
                    />
                    <ErrorMessage name="number_of_dose" component="span" className="error" />
                  </div>

                    <div className="form-row">
                      <label htmlFor="gender">Gender: </label>
                      <Field 
                      type="gender"
                      id="gender" 
                      as="select" 
                      name="gender"
                      placeholder="Select Gender">
                        <option value="" label="Select a gender"> Select gender</option>
                        <option key="Male" value="Male">Male</option>
                        <option key="Female" value="Female">Female</option>
                        <option key="Other" value="Other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="span"
                        className="error"
                      />
                </div>
              <div className="flex justify-center w-[500px]">
                <button
                  type="submit"
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                  disabled={!(dirty && isValid) }
                >
                   {action}
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
      </div>
      {/* <form className="w-full max-w-lg">
        <div className="flex-column justify-center">
          <div className="photo-wrapper p-2">
            <img className="w-32 h-32 rounded-full mx-auto" src={imagePreview} alt="Profile"></img>
          </div>
          <input id="files" className=" hidden ml-[100px] mt-5 bg-blue-500 capitalize hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded justify-end" onChange={(e) => handleImageSelect(e)} accept="png/jpeg" type="file">
          </input>
          <label className="block w-1/2 m-auto text-center mt-5 text-lg uppercase tracking-wide text-white pointer text-xs font-bold mb-2 pointer bg-blue-500 capitalize hover:bg-blue-700 text-white font-bold py-2 px-4 " for="files" >{action === 'add' ? 'Add Image' : 'Change Image'} </label>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 mt-10">

          <div className="w-1/2  px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Vaccine Name
            </label>
            <input value={formData.name} name="name" onChange={(e) => handleFormData(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Vaccine Name" required />
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          </div>
          <div className="w-1/2  px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Company Phone Number
            </label>
            <input value={formData.company_contact} name="company_contact" onChange={(e) => handleFormData(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Phone Number"/>
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Number of dose
            </label>
            <input value={formData.number_of_dose} name="number_of_dose" onChange={(e) => handleFormData(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Number of doses"></input>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Company E-mail
            </label>
            <input value={formData.company_email} name="company_email" onChange={(e) => handleFormData(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Company Email"></input>
          </div>
        </div>
        <div className="flex w-full">
        <button onClick={handleFormSubmit} className="bg-blue-500 capitalize hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded justify-end">
          {action}
        </button>
      </div>
      </form> */}
      
    </div>
  )
}

export default VaccineForm