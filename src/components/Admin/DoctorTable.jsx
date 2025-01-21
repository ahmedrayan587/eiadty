import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TR from '../Table/TR';
import { Link } from 'react-router-dom';
import FormInput from '../Form/FormInput';
import FormSelect from '../Form/FormSelect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../utils/APIRoutes';

export default function DoctorTable() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {
            const response = await axios.get(`${host}/Doctors/GetAllDoctors`);

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
    async function AppendAccount(phone) {

        try {
          const response = await axios.post(`${host}/Autho/AppendAccount`,{phone:phone});
      
          if (response.status == 200) {
            console.log('Piece data posted successfully:',response);
            toast.success("تم ايقاف الحساب",{
              position:'top-right',
              autoClose:2000,
              hideProgressBar:false,
              newestOnTop:false,
              closeOnClick:true,
              rtl:true,
              draggable:true,
              pauseOnHover:true,
              progress: undefined,
              theme:'light',
            });
            fetchData();
          } else {
            console.error('Error posting piece data:',response);
            toast.error("حدث خطأ اثناء عملية الايقاف");
          }
        } catch (error) {
          console.error('Error during post request:', error);
          toast.error("حدث خطأ اثناء عملية الايقاف");
        }
      };
      async function ActivateAccount(phone) {
        try {
          const response = await axios.post(`${host}/Autho/ActivateAccount`,{phone:phone});
      
          if (response.status == 200) {
            console.log('Piece data posted successfully:',response);
            toast.success("تم تفعيل الحساب",{
              position:'top-right',
              autoClose:2000,
              hideProgressBar:false,
              newestOnTop:false,
              closeOnClick:true,
              rtl:true,
              draggable:true,
              pauseOnHover:true,
              progress: undefined,
              theme:'light',
            });
            fetchData();
          } else {
            console.error('Error posting piece data:',response);
            toast.error("حدث خطأ اثناء عملية التفعيل");
          }
        } catch (error) {
          console.error('Error during post request:', error);
          toast.error("حدث خطأ اثناء عملية التفعيل");
        }
      };

      const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('');
      const filteredData = data.filter(row => {
        const value = row[searchType=="العيادة"?'department':searchType=="اسم الدكتور"?'name':searchType=="رقم التيليفون"?'phone':"name"].toLowerCase();
        return value.includes(searchTerm);
      });
        
  return (
    <div className="subject_table">
      <h1>سجل الاطباء</h1>
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
            <FormSelect key={"clinic"} name={"اختر نوع البحث"} optionsObj={["رقم التيليفون","اسم الدكتور","العيادة"]} setValues={setSearchType} />
          </div>
        <table>
            <thead>
                <TR  data={["العدد","الاسم","رقم التليفون","نوع العيادة","العنوان",""]} />
            </thead>
            <tbody className='three-button-tbody'>
            {filteredData.map((doctor, index) => (
                <TR key={index} data={[index+1,doctor.name,doctor.phone,doctor.department,`${doctor.governrate} - ${doctor.city} - ${doctor.adreess}`,
                <div className='three-button'>
                    <Link to={"/Layout/DoctorAllPosts"} state={{doctorPhone:doctor.phone}} className="button">
                        المنشورات
                    </Link>
                    <Link to={"/Layout/AllChecks"} state={{doctorPhone:doctor.phone}} className="button">
                        سجل الكشوفات
                    </Link>
                    {doctor.isActive?<button className="button" onClick={()=>{AppendAccount(doctor.phone);}}>ايقاف الحساب</button>:
                    <button className="button" onClick={()=>{ActivateAccount(doctor.phone);}}>تفعيل الحساب</button>}
                </div>]} />
            ))}
            </tbody>
        </table>
      </div>
    </div>

  )
}
