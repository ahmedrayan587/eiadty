import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useLocation } from 'react-router-dom'
import TR from '../Table/TR'
import FormSelect from '../Form/FormSelect';
import { host } from '../../utils/APIRoutes';

export default function History({patientPhone, role}) {
    const location = useLocation();
    const phone = location.state&&location.state.patientPhone;
    const [mainData, setMainData] = useState([]);
    const [data, setData] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [operations, setOperations] = useState([]);
    useEffect(() => {
      fetchData();
      fetchData2();
      fetchDiseases();
      fetchOperations();
      fetchDrugs();
    }, []);
    async function fetchData() {
      try {
        const response = await axios.get(`${host}/Checks/GetAllPatientChecks?patientPhone=`+(role=="Admin"?phone: patientPhone));
  
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
        const response = await axios.get(`${host}/Patients/GetPatientById?phone=`+(role=="Admin"?phone: patientPhone));
  
        if (response.status === 200) {
          setMainData(response.data);
          console.log(response.data);
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    };
    async function fetchDiseases() {
      try {
        const response = await axios.get(`${host}/Diseases/GetAllPatientDiseases?patientPhone=`+(role=="Admin"?phone: patientPhone));
  
        if (response.status === 200) {
          setDiseases(response.data);
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    };
    
    async function fetchOperations() {
      try {
        const response = await axios.get(`${host}/Operations/GetAllPatientOperations?patientPhone=`+(role=="Admin"?phone: patientPhone));
  
        if (response.status === 200) {
          setOperations(response.data);
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    };

    async function fetchDrugs() {
      try {
        const response = await axios.get(`${host}/Drugs/GetAllPatientDrugs?patientPhone=`+(role=="Admin"?phone: patientPhone));
  
        if (response.status === 200) {
          setDrugs(response.data);
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
        const value = row[searchType=="العيادة"?'clinic':searchType=="اسم الدكتور"?'doctor_Name':searchType=="التاريخ"?'date':"doctor_Name"].toLowerCase();
        return value.includes(searchTerm);
      });
  return (
    <div className="subject_table">
      <h1>السجل المرضي</h1>
        <div className="table_info flex-wrap">
        <h3>بيانات المريض</h3>
        <div className='table-info-data-container'>
        <h4 className="table-info-data">الاسم:- <span>{mainData.fName+" "+mainData.lName}</span></h4>
        <h4 className='table-info-data'>تاريخ الميلاد:- <span>{mainData.birthDate}</span></h4>
        <h4 className='table-info-data'>الامراض المزمنة:- </h4>
        <ul>
          {diseases.map((disease,index) => (
            <li key={index}>{disease.diseases_Name}</li>
          ))}
        </ul>
        <h4 className='table-info-data'>العمليات السابقة:- </h4>
        <ul>
          {operations.map((operation,index) => (
            <li key={index}>{operation.operation_Name}</li>
          ))}
        </ul>
        <h4 className='table-info-data'> الادوية الدائمة :- </h4>
        <ul>
          {drugs.map((drug, index) => (
            <li key={index}>{drug.drug_Name}</li>
          ))}
        </ul>
        <h4 className='table-info-data'> التدخين:- <span>{mainData.smoke?"مدخن":"غير مدخن"}</span></h4>
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
          <FormSelect key={"clinic"} name={"اختر نوع البحث"} optionsObj={["التاريخ","اسم الدكتور","العيادة"]} setValues={setSearchType} />
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
