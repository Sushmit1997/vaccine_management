import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Modal from 'react-responsive-modal'
import VaccineForm from "./VaccineForm";
import "./vaccineForm.scss"



const NavBar = ({ getVaccines }) => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const closeModal = () => {
    setShowModal(false)
  }

  let vaccine = {
    name: '',
    company_email: '',
    company_contact: '',
    number_of_dose: '',
    image: '',
    gender: ''
  }

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    width: "50%"
  };

  const handleLogOut = () => {
    localStorage.clear('token')
    navigate('/')
  }

  const handleActionSuccess = () => {
    closeModal()
    getVaccines()
  }

  return (
    <nav class="flex  flex-wrap bg-green-900 p-3">
      <div className="flex w-full justify-between">
        <div class="flex justify-end w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <button onClick={() => setShowModal(true)} href="#" class="inline-block mr-5 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Add Vaccine</button>
          <div>
            <span onClick={handleLogOut} class="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-white hover:bg-red-800 mt-4 lg:mt-0">Log Out</span>
          </div>
        </div>
      </div>
      <Modal
        open={showModal}
        style={styles}
        onClose={closeModal}
        closeOnEsc
      >
        <VaccineForm vaccine={vaccine} action="add" handleActionSuccess={handleActionSuccess} />
      </Modal>
    </nav>
  )
}

export default NavBar