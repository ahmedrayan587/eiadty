import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import TR from '../Table/TR'
import FormSelect from '../Form/FormSelect';
import { host } from '../../utils/APIRoutes';

export default function PatientHistory({doctorPhone}) {
    let { state } = useLocation();
    const [mainData, setMainData] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {

      fetchData();
      fetchData2();
    }, [state]);
    async function fetchData() {
      try {
        const response = await axios.get(`${host}/Checks/GetAllPatientDoctorCheck?patientPhone=${state.patient.patient_Phone}&doctorPhone=${doctorPhone}`);
  
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
        const response = await axios.get(`${host}/Patients/GetPatientById?phone=${state.patient.patient_Phone}`);
  
        if (response.status === 200) {
          setMainData(response.data);
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('');
      const filteredData = data.filter(row => {
        const value = row['date'].toLowerCase();
        return value.includes(searchTerm);
      });
  return (
    <div className="subject_table">
      <h1>السجل المرضي</h1>
      <div className="history-button-container">
        <Link to={"/Layout/check"} state={{state}} className="button">ابدا الكشف</Link>
      </div>
        <div className="table_info flex-wrap">
        <h3>بيانات المريض</h3>
        <div className='table-info-data-container'>
        <h4 className="table-info-data">الاسم:- <span>{mainData.fName+" "+mainData.lName}</span></h4>
        <h4 className='table-info-data'>تاريخ الميلاد:- <span>{mainData.birthDate}</span></h4>
        <h4 className='table-info-data'>الامراض المزمنة:- </h4>
        <ul>
            {mainData.heart&&<li>قلب</li>}
            {mainData.diabetes&&<li>سكر</li>}
            {mainData.pressure&&<li>ضغط</li>}
        </ul>
        <h4 className='table-info-data'>العمليات السابقة:- </h4>
        <ul>
            <li>الزائدة</li>
            <li>المرارة</li>
        </ul>
        <h4 className='table-info-data'> الادوية الدائمة :- </h4>
        <ul>
            <li>بنادول</li>
        </ul>
        <h4 className='table-info-data'> التدخين:- <span>{"غير مدخن"}</span></h4>
        </div>
    </div>
        <div className="table-body">
        <div className="panter-container">
        <h3>سجل الكشوفات</h3>
          <button id="print" onClick={()=>{window.print()}} className="button">
              طباعة الكشف
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="inputBox my-3 w-50">
            <input type="text"  required onKeyUp={(event)=>{
                setSearchTerm(event.target.value);
                if(event.target.value.length > 0){
                    event.target.classList.add('typed'); 
                }else{
                    event.target.classList.remove('typed');
                }}} />
            <span className="user">{"ابحث"}</span>
          </div>
          <FormSelect key={"clinic"} name={"اختر نوع البحث"} optionsObj={["التاريخ"]} setValues={setSearchType} />
        </div>
          <table>
            <thead>
                <TR  data={["","اسم الدكتور","العيادة","التاريخ",""]} />
            </thead>
            <tbody>
            {filteredData.map((check, index) => (
              <TR key={index} data={[index+1,check.doctor_Name,check.clinic,check.date,<Link to={"/Layout/CheckData"} state={{check}} className="button">
              بيانات الكشف
            </Link>]} />
            ))}
                
            </tbody>
          </table>
        </div>
    </div>
  )
}
