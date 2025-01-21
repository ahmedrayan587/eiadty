import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorCard.css'
import Button from '../Form/Button'
import { host } from '../../utils/APIRoutes';

export default function DoctorCard({data}) {
    const [doctorImage, setDoctorImage] = useState("");
    useEffect(() => {
        getDoctorImage()
        return () => {
          doctorImage&&URL.revokeObjectURL(doctorImage);
        };
      }, []);
    async function getDoctorImage() {
        try {
          const response = await axios.get(`${host}/Files/GetDoctorImage?doctorPhone=${data.phone}`, {
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
    <>
        <div className="doctor-card-container">
            <div className="doctor-card">
                <div className="img-content">
                    <img src={doctorImage} alt="" />
                </div>
                <div className="content">
                    <p className="heading">{"د/ " + data.name}</p>
                    <p>{data.governrate + ", "+data.city+", "+data.adreess}</p>
                    <Button name={"تفاصيل"} path={"/Layout/DoctorData"} data={{data}}  />
                </div>
            </div>
        </div>
    </>
  )
}
