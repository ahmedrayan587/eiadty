import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import Form from '../Form/Form'
import FormTitle from '../Form/FormTitle'
import FormTextarea from '../Form/FormTextarea'
import FormButton from '../Form/FormButton'
import FormInput from '../Form/FormInput'
import { useLocation } from 'react-router-dom';
import FormInputFile from '../Form/FormInputFile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../utils/APIRoutes';

export default function Check({doctorPhone}) {
    const location = useLocation();
    const patient = location.state.state.patient;
    console.log(patient);
    const [diagnosis,setDiagnosis] = useState("");
    const [img1,setImg1] = useState("");
    const [img2,setImg2] = useState("");
    const [img3,setImg3] = useState("");
    const submitButton = useRef();


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
    const response = await axios.post(`${host}/Checks/AddCheckInformation`,{book_Numbre:patient.book_Numbre,complaint:patient.complaint,doctor_Phone:doctorPhone,patient_Phone:patient.patient_Phone,date:patient.date,time:patient.time.replace(' pm',""),am_Pm:'pm',diagnosis:diagnosis,drugListUrl:'#',rayListUrl:'#',analysistListUrl:'#'});

    if (response.status == 200) {
      console.log('Piece data posted successfully:',response);
      submitButton.current.nextElementSibling.style = "pointer-events:unset;"
      toast.dismiss();
      toast.success("تم تسجيل الكشف",{
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
      submitButton.current.nextElementSibling.style = "pointer-events:unset;"
      toast.dismiss();
      toast.error("حدث خطأ اثناء عملية السجيل");
    }
  } catch (error) {
    console.error('Error during post request:', error);
    submitButton.current.nextElementSibling.style = "pointer-events:unset;"
    toast.dismiss();
    toast.error("حدث خطأ اثناء عملية السجيل");
    //console.log({book_Numbre:patient.book_Numbre,complaint:patient.complaint,doctor_Phone:doctorPhone,patient_Phone:patient.patient_Phone,date:patient.date,time:patient.time.replace(' pm',""),am_Pm:'pm',diagnosis:diagnosis,drugListUrl:'#',rayListUrl:'#',analysistListUrl:'#'});
  }
};
  function submit(event){
    event.preventDefault();
    fetchData();
  }
  return (
    <Form key={"ReservationForm"} submitFunction={submit} components={[
        <FormTitle key={"title"} name="تسجيل بيانات الكشف" />,
        <FormTextarea key={"diagnosis"} name="التشخيص" rows={4} minLength={10} maxLength={300} setValues={setDiagnosis}/>,
        <FormInputFile key={"img1"} name={"اضف صورة الروشتة"} type={"image"} setValues={setImg1} />,
        <FormInputFile key={"img2"} name={"اضف صورة الاشعة"} type={"image"} setValues={setImg2} />,
        <FormInputFile key={"img3"} name={"اضف صورة التحاليل"} type={"image"} setValues={setImg3} />,
        <FormButton key={"submit"} name="تسجيل" path="/Layout/DoctorPersonal" submitButton={submitButton} />
        ]} />
  )
}
