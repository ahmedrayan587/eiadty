import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import TableMain from '../Table/TableMain'
import TR from '../Table/TR'
import { host } from '../../utils/APIRoutes';

export default function DoctorReservation({doctorPhone}) {
  const [mainData, setMainData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);
  async function fetchData() {
    try {
      const response = await axios.get(`${host}/Books/GetAllDoctorBooksInDay?phone=${doctorPhone}`);

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };
  async function fetchData2() {
    try {
      const response = await axios.get(`${host}/Books/GetDoctorNameAndTodatDate?phone=${doctorPhone}`);

      if (response.status === 200) {
        setMainData(response.data.split(" - "));
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };
  return (
    <div className="subject_table">
      <h1>سجل الحجوزات</h1>
        <div className="table-body">
        <div className="panter-container">
        <h3>{"د/ " + mainData[0]}</h3>
        <h3>{mainData[1]}</h3>
          <button id="print" onClick={()=>{window.print()}} className="button">
              طباعة الكشف
          </button>
        </div>
          <table>
            <thead>
                <TR  data={["العدد","الاسم","الشكوي","الموعد","نوع الكشف",""]} />
            </thead>
            <tbody>
            {data.map((patient, index) => (
              <TR key={index} data={[index+1,patient.patient_Name,patient.complaint,patient.time,patient.book_Type=="newCheck"?'كشف':'استشارة',<Link to={"/Layout/PatientHistory"} state={{patient}} className="button">
              سجل المريض
            </Link>]} />
            ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}
