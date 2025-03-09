import React, { useState } from 'react';
import './DoctorMain.css';
import { Link } from 'react-router-dom';
import image from "../../assets/1669490451644.jpg";

export default function DoctorMain({ name, specialty, location, availability, phone, newcheck, recheck, role, dnone = "" }) {
  // Static image URL for the doctor
  const [doctorImage, setDoctorImage] = useState(image);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={role === "Doctor" ? 'main-data-container padding-bottom-10' : 'main-data-container'}>
        <img className="doctor-image" src={doctorImage} alt={name} />
        <span className="image-background"></span>
        <span className="image-background-2"></span>
        <span className="image-background-3"></span>
        <div className="special-data-container">
          <h2>{name}</h2>
          <p>
            <strong>التخصص:</strong> {specialty}
          </p>
          <p>
            <strong>رقم الموبايل:</strong> {phone}
          </p>
          <p>
            <strong>الموقع:</strong> 13 شارع محمد فريد قويسنا, منوفية
          </p>
          <p>
            <strong>سعر الكشف:</strong> 250
          </p>
          <p>
            <strong>سعر اعادة الكشف:</strong> 100
          </p>
          <Link to="/ReservationForm" state={{ doctorPhone: phone }} className={"button " + dnone}>
            احجز الان
          </Link>
        </div>
      </div>
    </div>
  );
}