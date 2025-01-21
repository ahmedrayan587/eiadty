import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TR from '../Table/TR';
import { Link } from 'react-router-dom';
import FormSelect from '../Form/FormSelect';
import { host } from '../../utils/APIRoutes';

export default function PatientTable() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {
            const response = await axios.get(`${host}/Patients/GetAllPatients`);

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

    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('');
      const filteredData = data.filter(row => {
        const value = searchType=="اسم المريض"?(row['fName'].toLowerCase()+" "+row['lName'].toLowerCase()):searchType=="رقم التيليفون"?row['phone'].toLowerCase():(row['fName'].toLowerCase()+" "+row['lName'].toLowerCase());
        return value.includes(searchTerm);
      });

  return (
    <div className="subject_table">
        <h1>سجل المرضى</h1>
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
            <FormSelect key={"clinic"} name={"اختر نوع البحث"} optionsObj={["رقم التيليفون","اسم المريض"]} setValues={setSearchType} />
            </div>
            <table>
                <thead>
                    <TR  data={["العدد","اسم المريض","رقم التليفون","تاريخ الميلاد",""]} />
                </thead>
                <tbody>
                {filteredData.map((patient, index) => (
                    <TR key={index} data={[index+1,`${patient.fName} ${patient.lName}`,patient.phone,patient.birthDate,
                        <Link to={"/Layout/History"} state={{patientPhone:patient.phone}} className="button">
                            السجل المرضي
                        </Link>]} />
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
