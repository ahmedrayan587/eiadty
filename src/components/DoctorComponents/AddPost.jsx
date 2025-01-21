import React, { useRef, useState } from 'react'
import axios from 'axios';
import Form from '../Form/Form'
import FormTitle from '../Form/FormTitle'
import FormButton from '../Form/FormButton'
import FormTextarea from '../Form/FormTextarea';
import FormInputFile from '../Form/FormInputFile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../utils/APIRoutes';

export default function AddPost({doctorPhone}) {
    const [text,setText] = useState();
    const [image,setImage] = useState();
    const [vedio,setVedio] = useState();
    const submitButton = useRef();


async function fetchData() {
  submitButton.current.nextElementSibling.style = "pointer-events:none;"
    toast.info("ربما تأخذ العملية عدة ثواني",{
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
  const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);
    formData.append('vedio', vedio);
    formData.append('doctorPhone', doctorPhone);

  try {
    const response = await axios.post(`${host}/Posts/CreateNewPost`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status == 200) {
      console.log('Piece data posted successfully:',response);
      submitButton.current.nextElementSibling.style = "pointer-events:unset;"
        toast.success("تمت اضافة المنشور",{
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
        toast.error("حدث خطأ اثناء عملية الاضافة");
    }
  } catch (error) {
    console.error('Error during post request:', error);
    submitButton.current.nextElementSibling.style = "pointer-events:unset;"
        toast.error("حدث خطأ اثناء عملية الاضافة");
  }
};
  function submit(event){
    event.preventDefault();
    fetchData();
  }
  return (
    <Form key={"AddPost"} submitFunction={submit} components={[
        <FormTitle key={"title"} name="اضافة منشور" />,
        <FormInputFile name={"اضف صورة"} type={"image"} setValues={setImage} />,
        <FormInputFile name={"اضف فيديو"} type={"video"} setValues={setVedio} />,
        <FormTextarea key={"postId"} name="النص" type="text" minLength={1} setValues={setText} />,
        <FormButton key={"submit"} name="اضافة" path={"/Layout/DoctorPersonal"} submitButton={submitButton} />
        ]} 
      />
  )
}
