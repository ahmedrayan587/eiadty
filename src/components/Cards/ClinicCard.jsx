import React from 'react'
import './ClinicCard.css'
import { Link } from 'react-router-dom'

export default function ClinicCard({name,details}) {
  return (
    <>
        <Link to="/Layout/AllDoctors" state={{name}} className="clinic-card-container">
            <div className="clinic-card">
            <div className="front-content">
                <p>{name}</p>
            </div>
            <div className="content">
                <p className="heading">{name}</p>
                <p>{details}</p>
            </div>
            </div>
        </Link>
        {/*<Link to="/Layout/AllDoctors" className="clinic-card-container">
            <div className="clinic-card">
            <div className="front-content">
                <img src={src} alt="" />
            </div>
            <div className="content">
                <p className="heading">{name}</p>
                <p>{details}</p>
            </div>
            </div>
        </Link>*/}
    </>
  )
}
