import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './AllDoctors.css'
import DoctorCard from '../Cards/DoctorCard'
import { host } from '../../utils/APIRoutes';

export default function AllDoctors() {
  const [data, setData] = useState([]);
  let { state } = useLocation();
  useEffect(() => {
    fetchData();
  }, []);
  console.log(state);
  async function fetchData() {
    try {
      const response = await axios.get(`${host}/Doctors/GetAllClinicDoctors?clinicName=${state.name}`);

      if (response.status === 200) {
        setData(response.data);
        console.log(data);
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };
  return (
    <div className='container'>
        <h2>اطباء {state.name}</h2>
        {data.map((doctor, index) => (
          <DoctorCard key={index}  data={doctor}/>
        ))}
    </div>
  )
}
