import React from 'react'
import Canvas from '../Canvas/Canvas'
import Button from '../Form/Button'

export default function AdminHome() {
  return (
    <div className="landing-container">
        <Canvas />
        <div className="content admin-home-content">
            <div className="d-flex flex-column justify-content-center align-items-center flex-wrap my-5">
              <Button name="اضافة طبيب" path="/Layout/DoctorSignup" />
              <Button name="سجل الاطباء" path="/Layout/DoctorTable" />
              <Button name="سجل المرضي" path="/Layout/PatientTable" />
            </div>
        </div>
    </div>
  )
}
