import React, { useRef } from 'react'
import Form from '../Form/Form'
import FormTitle from '../Form/FormTitle'
import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton'
import FormRadio from '../Form/FormRadio'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {

  const submitButton = useRef();  
  function submit(event){
    event.preventDefault();
    toast.success("تم تسجيل الحساب",{
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
        <Form key={"register"} submitFunction={submit} components={[
        <FormTitle key={"title"} name="انشاء حساب"/>,
        <FormInput key={"fname"} name="اسم الاول" type="text" minLength={3} maxLength={100} />,
        <FormInput key={"lname"} name="اسم الاخير" type="text" minLength={3} maxLength={100} />,
        <FormInput key={"birth"} name="تاريخ الميلاد" type="date" min='1924-01-01' max='2024-01-01' minLength={6} maxLength={100} />,
        <FormInput key={"phone"} name="رقم التليفون" type="text" minLength={11} maxLength={11} />,
        <FormInput key={"password"} name="كلمة المرور" type="password" minLength={8} maxLength={60} />,
        <FormInput key={"re-password"} name="اعد كلمة المرور" type="password" minLength={8} maxLength={60} />,
        <FormRadio key={"gender"} ArabicName={"النوع"} DataArray={[
              {"name":"gender", "value": "male", "text": "ذكر"},
              {"name":"gender", "value": "female", "text": "انثي"}
          ]} />,
          <FormRadio key={"smoke"} ArabicName={"التدخين"} DataArray={[
            {"name":"smoke", "value": "smoke", "text": "مدخن"},
            {"name":"smoke", "value": "notsmoke", "text": "غير مدخن"}
        ]} />,
        <FormButton key={"submit"} name="انشاء حساب" path="/Login" submitButton={submitButton} />
      ]} />
    </>
  )
}
