import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import FormTitle from '../Form/FormTitle';
import FormInput from '../Form/FormInput';
import "./CompleteData.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../utils/APIRoutes';

export default function CompleteData({patientPhone}) {
  const [chronics,setChronics] = useState("");
  const [allChronics, setAllChronics] = useState([]);
  const [surgeries,setSurgeries] = useState("");
  const [allSurgeries, setAllSurgeries] = useState([]);
  const [pharmaceutical,setPharmaceutical] = useState("");
  const [allPharmaceutical, setAllPharmaceutical] = useState([]);
  const submitButton = useRef();
  /*chronics */
  async function postChronics(diseases_Name) {
    try {
      const response = await axios.post(`${host}/Diseases/AddDiseases`,{patient_Phone:patientPhone,diseases_Name:diseases_Name});
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        getChronics();
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  async function getChronics() {
    try {
      const response = await axios.get(`${host}/Diseases/GetAllPatientDiseases?patientPhone=${patientPhone}`);
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        setAllChronics(response.data);
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  async function deleteChronics(diseases_Name) {
    try {
      const response = await axios.delete(`${host}/Diseases/DeleteDiseases?Patient_Phone=${patientPhone}&Diseases_Name=${diseases_Name}`);
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        getChronics();
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  useEffect(()=>{
    if(chronics.key =="Enter"&&chronics.target.value!=""){
        postChronics(chronics.target.value);
        setTimeout(() => {
            chronics.target.value="";
            chronics.target.classList.remove("typed");
        }, 50);
        
    }
},[chronics.key])
/*surgeries */
async function postSurgeries(operation_Name) {
    try {
      const response = await axios.post(`${host}/Operations/AddOperation`,{patient_Phone:patientPhone,operation_Name:operation_Name});
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        getSurgeries();
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  async function getSurgeries() {
    try {
      const response = await axios.get(`${host}/Operations/GetAllPatientOperations?patientPhone=${patientPhone}`);
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        setAllSurgeries(response.data);
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  async function deleteSurgeries(operation_Name) {
    try {
      const response = await axios.delete(`${host}/Operations/DeleteOperation?Patient_Phone=${patientPhone}&Operation_Name=${operation_Name}`);
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        getSurgeries();
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  useEffect(()=>{
    if(surgeries.key =="Enter"&&surgeries.target.value!=""){
        postSurgeries(surgeries.target.value);
        setTimeout(() => {
            surgeries.target.value="";
            surgeries.target.classList.remove("typed");
        }, 50);
        
    }
},[surgeries.key])
/*pharmaceutical */
async function postPharmaceutical(drug_Name) {
    try {
      const response = await axios.post(`${host}/Drugs/AddDrug`,{patient_Phone:patientPhone,drug_Name:drug_Name});
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        getPharmaceutical();
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  async function getPharmaceutical() {
    try {
      const response = await axios.get(`${host}/Drugs/GetAllPatientDrugs?patientPhone=${patientPhone}`);
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        setAllPharmaceutical(response.data);
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  async function deletePharmaceutical(drug_Name) {
    try {
      const response = await axios.delete(`${host}/Drugs/DeleteDrug?Patient_Phone=${patientPhone}&Drug_Name=${drug_Name}`);
  
      if (response.status == 200) {
        console.log('Piece data posted successfully:',response);
        getPharmaceutical();
      } else {
        console.error('Error posting piece data:',response);
      }
    } catch (error) {
      console.error('Error during post request:', error);
    }
  };
  useEffect(()=>{
    if(pharmaceutical.key =="Enter"&&pharmaceutical.target.value!=""){
        postPharmaceutical(pharmaceutical.target.value);
        setTimeout(() => {
            pharmaceutical.target.value="";
            pharmaceutical.target.classList.remove("typed");
        }, 50);
        
    }
},[pharmaceutical.key])
useEffect(()=>{
    patientPhone&&getChronics();
    patientPhone&&getPharmaceutical();
    patientPhone&&getSurgeries();
},[patientPhone])


  return (
        <div className="container">
          <div className="card">
          <FormTitle key={"title"} name="استكمال البيانات" />
          <FormInput name={"الامراض المزمنة"} type={"text"} minLength={0} maxLength={500} setValues={setChronics}/>
          <div className="complete-container">
            {allChronics.map((chronic, index) => (
              chronic&&<div className='complete-compo' key={index}>
                          <p>{chronic.diseases_Name}</p>
                          <button
                            onClick={()=>{
                              toast.warning(
                                <div className="custom-toast">
                                  <p>هل تريد تأكيد حذف الصورة؟</p>
                                  <div className='d-flex justify-content-evenly align-items-center'>
                                  <button className='btn btn-success' onClick={() => {
                                    deleteChronics(chronic.diseases_Name);
                                    toast.dismiss();}}>
                                    نعم
                                  </button>
                                  <button className='btn btn-danger' onClick={() => {toast.dismiss();}}>لا</button>
                                  </div>
                                </div>,
                              {
                                autoClose:false,
                                closeOnClick:false,
                                closeButton:false,
                              });
                            }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="color-red bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                          </svg>
                          </button>
                        </div>
            ))}
          </div>
          <FormInput name={"العمليات السابقة"} type={"text"} minLength={0} maxLength={500} setValues={setSurgeries}/>
          <div className="complete-container">
            {allSurgeries.map((surgeries, index) => (
              surgeries&&<div className='complete-compo' key={index}>
                          <p>{surgeries.operation_Name}</p>
                          <button
                            onClick={()=>{
                              toast.warning(
                                <div className="custom-toast">
                                  <p>هل تريد تأكيد حذف الصورة؟</p>
                                  <div className='d-flex justify-content-evenly align-items-center'>
                                  <button className='btn btn-success' onClick={() => {
                                    deleteSurgeries(surgeries.operation_Name);
                                    toast.dismiss();}}>
                                    نعم
                                  </button>
                                  <button className='btn btn-danger' onClick={() => {toast.dismiss();}}>لا</button>
                                  </div>
                                </div>,
                              {
                                autoClose:false,
                                closeOnClick:false,
                                closeButton:false,
                              });
                            }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="color-red bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                          </svg>
                          </button>
                        </div>
            ))}
          </div>
          <FormInput name={"الادوية االدائمة"} type={"text"} minLength={0} maxLength={500} setValues={setPharmaceutical}/>
          <div className="complete-container">
            {allPharmaceutical.map((pharmaceutical, index) => (
              pharmaceutical&&<div className='complete-compo' key={index}>
                          <p>{pharmaceutical.drug_Name}</p>
                          <button  
                            onClick={()=>{
                              toast.warning(
                                <div className="custom-toast">
                                  <p>هل تريد تأكيد حذف الصورة؟</p>
                                  <div className='d-flex justify-content-evenly align-items-center'>
                                  <button className='btn btn-success' onClick={() => {
                                    deletePharmaceutical(pharmaceutical.drug_Name);
                                    toast.dismiss();}}>
                                    نعم
                                  </button>
                                  <button className='btn btn-danger' onClick={() => {toast.dismiss();}}>لا</button>
                                  </div>
                                </div>,
                              {
                                autoClose:false,
                                closeOnClick:false,
                                closeButton:false,
                              });
                            }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="color-red bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                          </svg>
                          </button>
                        </div>
            ))}
          </div>
          <Link to={'/Layout/Explore'} className="button" >انهاء</Link>
          </div>
        </div>
  )
}
