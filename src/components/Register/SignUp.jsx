import React, { useRef, useState } from 'react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Form from '../Form/Form'
import FormTitle from '../Form/FormTitle'
import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton'
import FormRadio from '../Form/FormRadio'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../utils/APIRoutes';

export default function SignUp({setRole,setPhoneNumber}) {
  const [fname,setFName] = useState("");
  const [lname,setLName] = useState("");
  const [date,setDate] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [repassword,setRepassword] = useState("");
  const [gender,setGender] = useState("");
  const [smoke, setSmoke] = useState("");

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
    const response = await axios.post(`${host}/Autho/PatientRsegister`, {
      fname: fname,
      lname: lname,
      birthDate: date,
      phone: phone,
      password: password,
      checkPassword: repassword,
      isMale: gender=="male"?true:false,
      smoke: smoke=="smoke"?true:false
    });
    if (response.status === 200) {
      console.log('Piece data posted successfully:', response);
      submitButton.current.nextElementSibling.style = "pointer-events:unset;"
      toast.dismiss();
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
      fetchLogin();
    } else {
      console.error('Error posting piece data:', response);
      submitButton.current.nextElementSibling.style = "pointer-events:unset;"
      toast.dismiss();
      toast.error("حدث خطأ اثناء عملية السجيل");
    }
  } catch (error) {
    console.error('Error during post request:', error);
    submitButton.current.nextElementSibling.style = "pointer-events:unset;"
    toast.dismiss();
    toast.error("حدث خطأ اثناء عملية السجيل");
  }
};
async function fetchLogin() {

  try {
    const response = await axios.post(`${host}/Autho/LogIn`,{phone:phone,password:password});

    if (response.status == 200) {
      console.log('Piece data posted successfully:',response);
      setPhoneNumber(jwtDecode(response.data.token).prn);
      sessionStorage.setItem('userPhone', jwtDecode(response.data.token).prn);
      console.log(jwtDecode(response.data.token).prn);
      setRole(response.data.role);
      sessionStorage.setItem('userRole', response.data.role);
      setTimeout(() => {
        submitButton.current.click();
      }, 100);
    } else {
      console.error('Error posting piece data:',response);
    }
  } catch (error) {
    console.error('Error during post request:', error);
  }
};
function submit(event){
  event.preventDefault();
    if(repassword==password){
      fetchData();
    }else{
      setValidationText("كلمة المرور و اعادتها ليست بنفس القيمة.");
    }      
}
  return (
    <>
        <Form key={"register"} submitFunction={submit} components={[
        <FormTitle key={"title"} name="انشاء حساب"/>,
        <FormInput key={"fname"} name="اسم الاول" type="text" minLength={3} maxLength={100} setValues={setFName}/>,
        <FormInput key={"lname"} name="اسم الاخير" type="text" minLength={3} maxLength={100} setValues={setLName}/>,
        <FormInput key={"birth"} name="تاريخ الميلاد" type="date" min='1924-01-01' max='2024-01-01' minLength={6} maxLength={100} setValues={setDate}/>,
        <FormInput key={"phone"} name="رقم التليفون" type="text" minLength={11} maxLength={11} setValues={setPhone}/>,
        <FormInput key={"password"} name="كلمة المرور" type="password" minLength={8} maxLength={60} setValues={setPassword}/>,
        <FormInput key={"re-password"} name="اعد كلمة المرور" type="password" minLength={8} maxLength={60} setValues={setRepassword}/>,
        <FormRadio key={"gender"} ArabicName={"النوع"} DataArray={[
              {"name":"gender", "value": "male", "text": "ذكر"},
              {"name":"gender", "value": "female", "text": "انثي"}
          ]} setValues={setGender} />,
          <FormRadio key={"smoke"} ArabicName={"التدخين"} DataArray={[
            {"name":"smoke", "value": "smoke", "text": "مدخن"},
            {"name":"smoke", "value": "notsmoke", "text": "غير مدخن"}
        ]} setValues={setSmoke} />,
        <FormButton key={"submit"} name="انشاء حساب" path="/Layout/CompleteData" submitButton={submitButton} />
      ]} />
    </>
  )
}
