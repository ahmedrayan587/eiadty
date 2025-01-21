import React, { useEffect, useState } from 'react'
import "./App.css"
import Landing from './components/Landing/Landing'
import SignUp from './components/Register/SignUp'
import Login from './components/Register/Login'
import Explore from './components/Explore/Explore'
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import ReservationForm from './components/NewReservation/ReservationForm'
import MainSocial from './components/Social/MainSocial'
import AllDoctors from './components/AllDoctors/AllDoctors'
import DoctorData from './components/AllDoctors/DoctorData'
import DoctorReservation from './components/DoctorComponents/DoctorReservation'
import Check from './components/DoctorComponents/Check'
import DoctorPersonal from './components/DoctorComponents/DoctorPersonal'
import AddPost from './components/DoctorComponents/AddPost'
import History from './components/History/History'
import CheckData from './components/DoctorComponents/CheckData'
import PatientHistory from './components/DoctorComponents/PatientHistory'
import CompleteData from './components/Register/CompleteData'
import AdminHome from './components/Admin/AdminHome'
import PatientTable from './components/Admin/PatientTable'
import DoctorTable from './components/Admin/DoctorTable'
import DoctorAllPosts from './components/Admin/DoctorAllPosts'
import AllChecks from './components/Admin/AllChecks'
import BooksHistory from './components/History/BooksHistory'
import DoctorSignup from './components/Register/DoctorSignup'
import Cookies from 'js-cookie';

export default function App() {
  const [role,setRole] = useState("");
  /*phoneNumber is the phone of user login */
  const [phoneNumber,setPhoneNumber] = useState("");
  
  useEffect(()=>{
    Cookies.get('userPhone')&&setPhoneNumber(Cookies.get('userPhone'));
    Cookies.get('userRole')&&setRole(Cookies.get('userRole'));
    console.log(Cookies.get('userPhone'),Cookies.get('userRole'))
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/eiadty' element={<Landing />} />
          <Route path='/Layout' element={<Layout role={role} />} >
            <Route path='SignUp' element={<SignUp setRole={setRole} setPhoneNumber={setPhoneNumber} />} />
            <Route path='Login' element={<Login setRole={setRole} setPhoneNumber={setPhoneNumber} />} />
            <Route path='CompleteData' element={<CompleteData patientPhone={phoneNumber} />} />
            <Route path='Explore' element={<Explore />} />
            <Route path='BooksHistory' element={<BooksHistory patientPhone={phoneNumber} />} />
            <Route path='History' element={<History patientPhone={phoneNumber} role={role} />} />
            <Route path='ReservationForm' element={<ReservationForm userPhone={phoneNumber} />} />
            <Route path='MainSocial' element={<MainSocial patientPhone={phoneNumber} role={role} />} />
            <Route path='AllDoctors' element={<AllDoctors />} />
            <Route path='DoctorData' element={<DoctorData patientPhone={phoneNumber} role={role} />} />
            {/*doctor Links */}
            <Route path='DoctorReservation' element={<DoctorReservation doctorPhone={phoneNumber} />} />
            <Route path='check' element={<Check doctorPhone={phoneNumber} />} />
            <Route path='DoctorPersonal' element={<DoctorPersonal doctorPhone={phoneNumber} role={role} />} />
            <Route path='AddPost' element={<AddPost doctorPhone={phoneNumber} />} />
            <Route path='CheckData' element={<CheckData />} />
            <Route path='PatientHistory' element={<PatientHistory doctorPhone={phoneNumber}  />} />
            {/*Admin Links */}
            <Route path='AdminHome' element={<AdminHome />} />
            <Route path='DoctorSignup' element={<DoctorSignup />} />
            <Route path='PatientTable' element={<PatientTable />} />
            <Route path='DoctorTable' element={<DoctorTable />} />
            <Route path='DoctorAllPosts' element={<DoctorAllPosts />} />
            <Route path='AllChecks' element={<AllChecks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
