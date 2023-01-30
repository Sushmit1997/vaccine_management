import { useState, useEffect } from 'react'
import VaccineCard from '../components/VaccineCard'
import NavBar from '../components/NavBar'
import Loader from "react-loader-spinner";
import React from 'react';

const Services = require('../remoteServices/RemoteServices');

const HomePage = () => {
  const [vaccines, setVaccines] = useState([])
  const [vaccinesLoading, setVaccinesLoading] = useState(true)

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    getVaccines()
  }, [])

  const getVaccines = () => {
    Services.getVaccines().then((res) => {
      setVaccines(res)
      setVaccinesLoading(false)
    })
  }



  return (
    <div >
      <NavBar getVaccines={getVaccines} />
      <div className='p-10 mx-20 rounded-3xl mt-5'>
        <div className='text-center mt-1 font-mono'><h1 className='text-3xl'>Welcome ({user?.email})</h1></div>
        <div className='text-center mt-5'><h1 className='text-2xl mt-5'>Total Vaccines ({vaccines.length})</h1></div>
        <div className='flex-column p-20 mt-2 rounded-lg justify-center p-10'>
          {vaccinesLoading ?
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              /> </div> :

            vaccines.map((vaccine) => {
              return (
                <VaccineCard vaccine={vaccine} getVaccines={getVaccines} />
              )
            })
          }

        </div>
      </div>
    </div>
  )
}

export default HomePage