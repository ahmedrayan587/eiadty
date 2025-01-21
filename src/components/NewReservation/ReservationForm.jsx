import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import Form from '../Form/Form'
import FormTitle from '../Form/FormTitle';
import FormTextarea from '../Form/FormTextarea';
import FormInput from '../Form/FormInput';
import FormSelect from '../Form/FormSelect';
import FormButton from '../Form/FormButton';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../utils/APIRoutes';

export default function ReservationForm({userPhone}) {
    const location = useLocation();
    const doctorData = location.state;
    const [doctorPhone,setDoctorPhone] = useState();
    const [problem,setProblem] = useState();
    const [date,setDate] = useState();
    const [time,setTime] = useState();
    const [type,setType] = useState();
    const submitButton = useRef();
    useEffect(()=>{
      if (doctorData){
        setDoctorPhone(doctorData.doctorPhone);
        console.log(userPhone,doctorData.doctorPhone);
      }
    },[doctorData])

  async function fetchData() {
    submitButton.current.nextElementSibling.style = "pointer-events:none;"
    toast.loading("ربما تأخذ العملية عدة ثواني",{
      position:'top-right',
      autoClose:false,
      hideProgressBar:false,
      newestOnTop:false,
      closeOnClick:true,
      rtl:true,
      draggable:true,
      pauseOnHover:true,
      progress: undefined,
      theme:'light',
    });

    try {
      const response = await axios.post(`${host}/Books/CreateBookAsync`,{patient_Phone:userPhone,doctor_Phone:doctorPhone,complaint:problem,date:date,time:`${time}pm`,book_Type:type=='كشف'?'newCheck':'reCheck'});
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        submitButton.current.nextElementSibling.style = "pointer-events:unset;"
        toast.dismiss();
        toast.success("تم الحجز",{
          position:'top-right',
          autoClose:5000,
          hideProgressBar:false,
          newestOnTop:false,
          closeOnClick:true,
          rtl:true,
          draggable:true,
          pauseOnHover:true,
          progress: undefined,
          theme:'light',
        });
        setTimeout(() => {
          submitButton.current.click();
        }, 100);
      } else {
        console.error('Error posting piece data:',response);
        toast.dismiss();
        toast.error("حدث خطأ اثناء عملية الحجز");
      }
    } catch (error) {
      console.error('Error during post request:', error);
      toast.dismiss();
      toast.error("حدث خطأ اثناء عملية الحجز");
      console.log({patient_Phone:userPhone,doctor_Phone:doctorPhone,complaint:problem,date:date,time:time,book_Type:type=='كشف'?'newCheck':'reCheck'});
    }
  };
  function submit(event){
    event.preventDefault();
    fetchData();
  }
  return (
      <>
      {/*  
        !doctorData&&<Form key={"ReservationForm"} submitFunction={submit} components={[
        <FormTitle key={"title"} name="احجز الان" />,
        <FormSelect key={"clinic"} name={"اختر العيادة"} optionsObj={["عيادة الصدر","عيادة الباطنة"]} setValues={setClinic} />,
        <FormSelect key={"doctor"} name={"اختر الدكتور"} optionsObj={["محمد اسماعيل","محمد علي رزق"]} setValues={setDoctor} />,
        <FormTextarea key={"problem"} name="الشكوى" rows={4} minLength={10} maxLength={300} setValues={setProblem}/>,
        <FormInput key={"date"} name="تاريخ الحجز" type="date" min='2024-01-01' max='2025-01-01' minLength={6} maxLength={100} setValues={setDate}/>,
        <FormInput key={"time"} name="موعد الحجز" type="time" min='12:00' max='20:00' minLength={1} maxLength={7} setValues={setTime}/>,
        <FormButton key={"submit"} name="احجز الان" path="/Layout/Explore" submitButton={submitButton} />
        ]} />
      */}
      {
        doctorData&&<Form key={"ReservationForm"} submitFunction={submit} components={[
        <FormTitle key={"title"} name="احجز الان" />,
        <FormTextarea key={"problem"} name="الشكوى" rows={4} minLength={10} maxLength={300} setValues={setProblem}/>,
        <FormInput key={"date"} name="تاريخ الحجز" type="date" min='2024-01-01' max='2025-01-01' minLength={6} maxLength={100} setValues={setDate}/>,
        <FormInput key={"time"} name="موعد الحجز" type="time" min='12:00' max='20:00' minLength={1} maxLength={7} setValues={setTime}/>,
        <FormSelect key={"clinic"} name={"اختر نوع الحجز"} optionsObj={["استشارة","كشف"]} setValues={setType} />,
        <FormButton key={"submit"} name="احجز الان" path="/Layout/BooksHistory" submitButton={submitButton} />
        ]} />
      }
      </>
  )
}
