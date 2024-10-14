import React from 'react'

const PatientSideBar = () => {
  return (
    <div className='nav-bar'>
                <ul className='nav-list'>
                  <a href="">
                    <li className='nav-element'>Home</li>
                  </a>
                  <a href="">
                    <li className='nav-element active-element'>My Appointments</li>
                  </a>

                  <a href="">
                    <li className='nav-element'>Profile</li>
                  </a>
                   

                </ul>
            </div>
  )
}

export default PatientSideBar