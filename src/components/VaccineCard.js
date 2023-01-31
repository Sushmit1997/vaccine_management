import { avatar } from "../assets"
import { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import VaccineForm from "./VaccineForm";
import { useToasts } from 'react-toast-notifications';


const Services = require('../remoteServices/RemoteServices');

const styles = {
  fontFamily: "sans-serif",
  fontSize: "14px",
  textAlign: "center",
  width: "50%"
};


const VaccineCard = ({ vaccine, getVaccines }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const address = 'http://localhost:5000'
  // const address = process.env.REACT_APP_API_URL

  const { addToast } = useToasts();

  const closeModal = () => {
    setShowModal(false)
  }

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false)
  }

  const handleActionSuccess = () => {
    closeModal()
    getVaccines()
  }

  const handleDelete = () => {
    Services.deleteVaccine(vaccine._id).then((res) => {
      addToast('Vaccine deleted.', { appearance: 'success' });
      closeDeleteConfirm()
      getVaccines()
    }).catch((err) => {
      addToast('Operation failed', { appearance: 'error' });
    })
  }

  const handleMandatory = () => {
    Services.addRemoveMandate(vaccine._id).then((res) => {
      addToast(vaccine.isMandatory ? 'Removed from mandatory.' : 'Added to mandatory', { appearance: 'success' });
      getVaccines()
    })
  }


  return (
    <div className="flex justify-center mb-10 ">

      <div className="relative max-w-[500px] min-w-[300px] bg-white shadow-xl rounded-lg py-3 shadow-3xl">
        <div onClick={() => setShowMenu(true)} className="absolute right-[15px] top-[5px] cursor-pointer "><i className="fa fa-ellipsis-v "></i></div>
        <div onClick={handleMandatory} className="absolute right-[35px] top-[5px] cursor-pointer "><i className={`fa fa-map-pin ${vaccine.isMandatory ? 'text-red-500' : 'text-black'} `}></i></div>
        {showMenu && <div onMouseLeave={() => setShowMenu(false)} className="absolute right-[-70px] top-[5px] cursor-pointer bg-white p-[5px] shadow-sm"><ul>
          <li className="hover:text-teal-500" onClick={() => setShowModal(true)}>Update</li>
          <li className="hover:text-teal-500" onClick={() => setShowDeleteConfirm(true)}>Delete</li>
        </ul>
        </div>
        }
        <div className="flex-col">
        <div className="photo-wrapper p-2">
        <img className="w-32 h-32 rounded-full mx-auto" src={vaccine.image ? address + "/" + vaccine.image : avatar} alt={`${vaccine.name} Image`}></img>
        </div>
        <div className="p-2">
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{vaccine.name}</h3>

          <div className="flex justify-center">
            <table className="text-xs my-3">
              <tbody><tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Company Email</td>
                <td className="px-2 py-2">{vaccine.company_email}</td>
              </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                  <td className="px-2 py-2">{vaccine.company_contact}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Doses</td>
                  <td className="px-2 py-2">{vaccine.number_of_dose}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">Gender</td>
                  <td className="px-2 py-2">{vaccine.gender}</td>
                </tr>
              </tbody></table>
          </div>
        </div>
        </div>
      </div>
      <Modal
        open={showModal}
        contentLabel="Example Modal"
        onClose={closeModal}
        showCloseIcon
        closeOnEsc
      >
        <VaccineForm vaccine={vaccine} action='update' handleActionSuccess={handleActionSuccess} />
      </Modal>
      <Modal
        open={showDeleteConfirm}
        style={styles}
        onClose={closeDeleteConfirm}
        closeOnEsc
        center
      >
        <br/>
        <div className="flex-column">
          <span className="text-lg">Are you sure you want to delete this vaccine?</span>
          <div className="flex justify-between w-1/2 mt-5">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Delete</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeDeleteConfirm}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default VaccineCard