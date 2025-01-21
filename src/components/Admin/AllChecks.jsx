import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import TR from '../Table/TR';
import FormSelect from '../Form/FormSelect';
import { host } from '../../utils/APIRoutes';

export default function AllChecks() {
    const [checks, setChecks] = useState([]);
    const location = useLocation();
    const doctorPhone = location.state.doctorPhone;
    useEffect(() => {
        doctorPhone&&fetchData();
    }, [doctorPhone]);
    async function fetchData() {
        try {
            const response = await axios.get(`${host}/Checks/GetAllDoctorChecks?doctorPhone=${doctorPhone}`);

            if (response.status === 200) {
                setChecks(response.data);
                console.log(checks);
            } else {
                console.error('Error fetching data:', response);
            }
        } catch (error) {
            console.error('Error during request:', error);
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('');
      const filteredData = checks.filter(row => {
        const value = row[searchType=="اسم المريض"?'patient_Name':searchType=="التاريخ"?'date':"patient_Name"].toLowerCase();
        return value.includes(searchTerm);
      });
  return (
    <div className="subject_table">
        <h1>سجل الكشوفات</h1>
        <div className='table-body py-5'>
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
            <FormSelect key={"clinic"} name={"اختر نوع البحث"} optionsObj={["التاريخ","اسم المريض"]} setValues={setSearchType} />
            </div>
            <table>
                <thead>
                    <TR  data={["العدد","رقم الكشف","اسم المريض","التاريخ",""]} />
                </thead>
                <tbody>
                {filteredData.map((check, index) => (
                    <TR key={index} data={[index+1,check.book_Numbre,check.patient_Name,check.date,
                        <Link to={"/Layout/CheckData"} state={{check:check}} className="button">
                            تفاصيل الكشف
                        </Link>]} />
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
