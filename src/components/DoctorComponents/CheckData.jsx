import React, { useState, useEffect } from 'react';
import axios from 'axios';
import src from '../../assets/pexels-karolina-grabowska-4021769.jpg'
import { useLocation } from 'react-router-dom';
import { host } from '../../utils/APIRoutes';

export default function CheckData() {
    let { state } = useLocation();
    const [mainData, setMainData] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);
    async function fetchData() {
        try {
          const response = await axios.get(`${host}/Checks/GetCheckByNumbre?num=${state.check.book_Numbre}`);
    
          if (response.status === 200) {
            setMainData(response.data);
            console.log(mainData);
          } else {
            console.error('Error fetching data:', response);
          }
        } catch (error) {
          console.error('Error during request:', error);
        }
      };
  return (
    <div className='subject_table check-data'>
      <div className="table_info">
          <h3>بيانات الكشف</h3>
          <div className='table-info-data-container'>
            <h4 className="table-info-data">الاسم الدكتور:- <span>{state.check.doctor_Name}</span></h4>
            <h4 className='table-info-data'>تاريخ الكشف:- <span>{mainData.date}</span></h4>
            <h4 className='table-info-data'>المشكلة : <span>{mainData.complaint}</span></h4>
            <h4 className='table-info-data'>التشخيص : <span>{mainData.diagnosis}</span></h4>
            <h4 className='table-info-data'>الروشتة</h4>
            <img src={src} alt="" />
            <h4 className='table-info-data'>التحاليل</h4>
            <img src={src} alt="" />
            <h4 className='table-info-data'>الاشعة</h4>
            <img src={src} alt="" />
          </div>
      </div>
    </div>
  )
}
