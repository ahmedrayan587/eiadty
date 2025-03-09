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

export default function ReservationForm() {
    const location = useLocation();
    const doctorData = location.state;
    const submitButton = useRef();
  function submit(event){
    event.preventDefault();
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
    submitButton.current.click();
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
        <FormTextarea key={"problem"} name="الشكوى" rows={4} minLength={10} maxLength={300} />,
        <FormInput key={"date"} name="تاريخ الحجز" type="date" min='2024-01-01' max='2025-01-01' minLength={6} maxLength={100} />,
        <FormInput key={"time"} name="موعد الحجز" type="time" min='12:00' max='20:00' minLength={1} maxLength={7} />,
        <FormSelect key={"clinic"} name={"اختر نوع الحجز"} optionsObj={["استشارة","كشف"]} />,
        <FormButton key={"submit"} name="احجز الان" path="/" submitButton={submitButton} />
        ]} />
      }
      </>
  )
}
