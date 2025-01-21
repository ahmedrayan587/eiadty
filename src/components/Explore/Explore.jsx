import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ClinicCard from '../Cards/ClinicCard';
import src from '../../assets/1_20231219_021200_0000.png';
import ExploreMain from './ExploreMain';
import { host } from '../../utils/APIRoutes';

export default function Explore() {
  const [data, setData] = useState([]);
  let { state } = useLocation();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`${host}/Clinics/GitClinics`);

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };

  return (
    <>
      <ExploreMain />
      <div className='container'>
        <h2>العيـادات</h2>
        {data.map((clinic, index) => (
          <ClinicCard key={index} name={clinic.name} details={clinic.details} />
        ))}
      </div>
    </>
  );
}
