import React, { useRef, useState } from 'react'
import Form from '../Form/Form'
import FormTitle from '../Form/FormTitle'
import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const submitButton = useRef();

  function submit(event){
    event.preventDefault();
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
    submitButton.current.click();
  }
  return (
        <>
          
          <Form key={"login"} submitFunction={submit} components={[
          <FormTitle key={"title"} name="تسجيل الدخول" />,
          <FormInput key={"phone"} name="رقم التليفون" type="text" minLength={11} maxLength={11}/>,
          <FormInput key={"password"} name="كلمة المرور" type="password" minLength={8} maxLength={60} />,
          <FormButton key={"submit"} name="تسجيل الدخول" path={"/"} submitButton={submitButton} />
          ]} 
        />
        </>
  )
}
