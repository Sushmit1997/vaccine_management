
import { useEffect, useState } from "react"
import { useToasts } from 'react-toast-notifications';

import { avatar } from "../assets"



const Services = require('../remoteServices/RemoteServices');

const VaccineForm = ({ action, vaccine, handleActionSuccess }) => {
  const address = process.env.REACT_APP_API_URL
  const [imagePreview, setImagePreview] = useState(address + "/" + vaccine?.image)

  const [formData, setFormData] = useState({
    name: vaccine.name,
    company_email: vaccine.company_email,
    company_number: vaccine.company_number,
    number_of_dose: vaccine.number_of_dose,
  })

  useEffect(() => {
    action === 'add' && setImagePreview(avatar)
  }, [])


  const { addToast } = useToasts();

  const handleFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const getExtension = (filename) => {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  const isImage = (filename) => {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'jpeg':
        //etc
        return true;
    }
    return false;
  }

  const handleImageSelect = (e) => {
    let fileName = e.target.files[0].name
    let file = e.target.files[0]
    if (isImage(fileName)) {
      setFormData({ ...formData, image: file })
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleFormSubmit = () => {

    const data = new FormData()
    data.append('name', formData.name)
    data.append('company_email', formData.company_email)
    data.append('company_contact', formData.company_contact)
    data.append('number_of_dose', formData.number_of_dose)


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
      <form className="w-full max-w-lg">
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
            <input value={formData.company_contact} name="company_contact" onChange={(e) => handleFormData(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Phone Number"></input>
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
      </form>
      
    </div>
  )
}

export default VaccineForm