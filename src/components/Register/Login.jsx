import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Form from '../Form/Form'
import FormTitle from '../Form/FormTitle'
import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { host } from '../../utils/APIRoutes';

export default function Login({setRole,setPhoneNumber}) {
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [data,setData] = useState("");
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
    const response = await axios.post(`${host}/Autho/LogIn`,{phone:phone,password:password});

    if (response.status == 200) {
      toast.dismiss();
      toast.success("تم تسجيل الدخول",{
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
      console.log('Piece data posted successfully:',response);
      setPhoneNumber(jwtDecode(response.data.token).prn);
      Cookies.set('userPhone', jwtDecode(response.data.token).prn);
      console.log(jwtDecode(response.data.token).prn);
      setRole(response.data.role);
      Cookies.set('userRole', response.data.role);
      Cookies.set('refToken', response.data.refreshtoken);
      setData(response.data.role)
      submitButton.current.nextElementSibling.style = "pointer-events:unset;"
      setTimeout(() => {
        submitButton.current.click();
      }, 100);
    } else {
      submitButton.current.nextElementSibling.style = "pointer-events:unset;"
      toast.dismiss();
      toast.error("خطأ في رقم التيليفون او كلم المرور");
      console.error('Error posting piece data:',response);
    }
  } catch (error) {
    submitButton.current.nextElementSibling.style = "pointer-events:unset;"
    toast.dismiss();
    toast.error("خطأ في رقم التيليفون او كلم المرور");
    console.error('Error during post request:', error);
  }
};
  function submit(event){
    event.preventDefault();
    fetchData();
  }
  return (
        <>
          
          <Form key={"login"} submitFunction={submit} components={[
          <FormTitle key={"title"} name="تسجيل الدخول" />,
          <FormInput key={"phone"} name="رقم التليفون" type="text" minLength={11} maxLength={11} setValues={setPhone}/>,
          <FormInput key={"password"} name="كلمة المرور" type="password" minLength={8} maxLength={60} setValues={setPassword} />,
          <FormButton key={"submit"} name="تسجيل الدخول" path={data=='Patient'?"/Layout/Explore":data=='Doctor'?"/Layout/DoctorPersonal":data=='Admin'?"/Layout/AdminHome":""} submitButton={submitButton} />
          ]} 
        />
        </>
  )
}
