import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorMain.css'
import { Link } from 'react-router-dom'
import { host } from '../../utils/APIRoutes';


export default function DoctorMain({name,specialty,location,availability,phone,newcheck,recheck,role,dnone=""}) {
  const [doctorImage, setDoctorImage] = useState("");
  useEffect(() => {
    phone&&getDoctorImage()
      return () => {
        doctorImage&&URL.revokeObjectURL(doctorImage);
      };
    }, [phone]);
  async function getDoctorImage() {
      try {
        const response = await axios.get(`${host}/Files/GetDoctorImage?doctorPhone=${phone}`, {
          responseType: 'arraybuffer' // Set responseType to arraybuffer to get binary data
        });
        const blob = new Blob([response.data], { type: response.headers['image/*'] }); // Create a blob from the response data
        const objectURL = URL.createObjectURL(blob); // Create an object URL for the blob
        setDoctorImage(objectURL);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className={role=="Doctor"?'main-data-container padding-bottom-10':'main-data-container'}>
        <img className="doctor-image" src={doctorImage} alt={name} />
        <span className="image-background"></span>
        <span className="image-background-2"></span>
        <span className="image-background-3"></span>
        <div className="special-data-container">
          <h2>{name}</h2>
          <p><strong>التخصص:</strong> {specialty}</p>
          <p><strong>رقم الموبايل:</strong> {phone}</p>
          <p><strong>الموقع:</strong> {location}</p>
          <p><strong>المواعيد:</strong> {availability}</p>
          <p><strong>سعر الكشف:</strong> {newcheck}</p>
          <p><strong>سعر اعادة الكشف:</strong> {recheck}</p>
          <Link to='/Layout/ReservationForm' state={{doctorPhone : phone}}  className={"button "+dnone} >احجز الان</Link>
        </div>
      </div>
    </div>
)
}
