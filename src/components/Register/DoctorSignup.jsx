import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Form from '../Form/Form'
import FormTitle from '../Form/FormTitle'
import FormInput from '../Form/FormInput'
import FormButton from '../Form/FormButton'
import FormSelect from '../Form/FormSelect'
import FormInputFile from '../Form/FormInputFile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../utils/APIRoutes';

export default function DoctorSignup() {
    const [clinics, setClinics]= useState([]);
    const [image,setImage] = useState(null);
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [repassword,setRepassword] = useState("");
    const [address,setAddress] = useState("");
    const [governrate,setGovernrate] = useState("");
    const [city,setCity] = useState("");
    const [department,setDepartment] = useState("");
    const [degree,setDegree] = useState("");
    const [fromDay,setFromDay] = useState("");
    const [toDay,setToDay] = useState("");
    const [fromHour,setFromHour] = useState("");
    const [toHour,setToHour] = useState("");
    const [newCheckPrice,setNewCheckPrice] = useState(0);
    const [reCheckPrice,setReCheckPrice] = useState(0);
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
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('checkPassword', repassword);
    formData.append('governrate', governrate);
    formData.append('city', city);
    formData.append('adreess', address);
    formData.append('department', department);
    formData.append('scienceDegree', degree);
    formData.append('fromDay', fromDay);
    formData.append('toDay', toDay);
    formData.append('fromHour', fromHour);
    formData.append('toHour', toHour);
    formData.append('newCheckPrie', newCheckPrice);
    formData.append('reCheckPrie', reCheckPrice);
    try {
      const response = await axios.post(`${host}/Autho/DoctorRegister`,formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
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
      } else {
        console.error('Error posting piece data:', response);
        submitButton.current.nextElementSibling.style = "pointer-events:unset;"
        toast.dismiss();
        toast.error("حدث خطأ اثناء عملية السجيل");
        // Handle error (display error message, etc.)
      }
    } catch (error) {
      console.error('Error during post request:', error);
      submitButton.current.nextElementSibling.style = "pointer-events:unset;"
      toast.dismiss();
        toast.error("حدث خطأ اثناء عملية التسجيل");
    }
  };
  async function fetchData2() {
    try {
      const response = await axios.get(`${host}/Clinics/GitClinics`);

      if (response.status === 200) {
        setClinics(response.data.map(clinic => clinic.name));
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };
  useEffect(()=>{
    fetchData2();
  },[])
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
        <FormTitle key={"title"} name="اضافة طبيب"/>,
        <FormInputFile name={"اضف الصورة الشخصية"} type={"image"} setValues={setImage} />,
        <FormInput key={"name"} name="اسم" type="text" minLength={3} maxLength={100} setValues={setName}/>,
        <FormInput key={"phone"} name="رقم التليفون" type="text" minLength={11} maxLength={11} setValues={setPhone}/>,
        <FormInput key={"password"} name="كلمة المرور" type="password" minLength={8} maxLength={60} setValues={setPassword}/>,
        <FormInput key={"re-password"} name="اعد كلمة المرور" type="password" minLength={8} maxLength={60} setValues={setRepassword}/>,
        <FormInput key={"governrate"} name="المحافظة" type="text" minLength={1} maxLength={40} setValues={setGovernrate}/>,
        <FormInput key={"city"} name="المدينة" type="text" minLength={1} maxLength={100} setValues={setCity}/>,
        <FormInput key={"address"} name="العنوان" type="text" minLength={1} maxLength={100} setValues={setAddress}/>,
        <FormSelect key={"department"} name="التخصص" optionsObj={clinics}  setValues={setDepartment}/>,
        <FormInput key={"degree"} name="الدرجة العلمية" type="text" minLength={3} maxLength={200} setValues={setDegree}/>,
        <FormSelect key={"fromDay"} name={"اختر يوم البداية"} optionsObj={["السبت","الاحد","الاثنين","الثلاثاء","الاربعاء","الخميس","الجمعة"]} setValues={setFromDay}/>,
        <FormSelect key={"toDay"} name={"اختر يوم النهاية"} optionsObj={["السبت","الاحد","الاثنين","الثلاثاء","الاربعاء","الخميس","الجمعة"]} setValues={setToDay}/>,
        <FormInput key={"fromHour"} name="موعد البداية" type="time" min='00:00' max='24:00' minLength={1} maxLength={7} setValues={setFromHour}/>,
        <FormInput key={"toHour"} name="موعد النهاية" type="time" min='00:00' max='24:00' minLength={1} maxLength={7} setValues={setToHour}/>,
        <FormInput key={"newCheckPrice"} name="سعر الكشف" type="number" minLength={1} maxLength={5} setValues={setNewCheckPrice}/>,
        <FormInput key={"reCheckPrice"} name="سعر اعادة الكشف" type="number" minLength={1} maxLength={5} setValues={setReCheckPrice}/>,
        <FormButton key={"submit"} name="انشاء حساب" path="/Layout/AdminHome" submitButton={submitButton} />
      ]} />
    </>
  )
}
