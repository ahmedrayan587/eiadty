import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import'./Layout.css'
import { Link, Outlet} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { host } from '../../utils/APIRoutes';

export default function Layout({role}) {
    const menuIcon = useRef();
    const menuUl = useRef();
    const nestedMenu = useRef();
    console.log(role);
    async function Logout() {

        try {
          const response = await axios.post(`${host}/Autho/revokeToken`,{token:Cookies.get('refToken')});
      
          if (response.status == 200) {
            Cookies.set('userPhone', "");
            Cookies.set('userRole', "");
            Cookies.set('refToken', "");
            console.log('Piece data posted successfully:',response);
            window.location.assign("/");
          } else {
            console.error('Error posting piece data:',response);
          }
        } catch (error) {
          console.log('Error during post request:', error);
        }
      };
  return (
    <>
        <ToastContainer 
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        <header>
            <div className="header-container">
                <Link to="/Layout/Explore" className="logo">عيادتي</Link>
                <div>
                    <div className="list">
                        <div id="menuIconContainer" className="menu-icon-container" onClick={()=>{
                            menuIcon.current.classList.toggle('active-menu');
                            menuUl.current.classList.toggle('active-menu-ul');
                        }}>
                            <span ref={menuIcon} className="menu-icon"></span>
                        </div>
                        <ul ref={menuUl}>
                            {/*<li onClick={(event)=>{
                                event.target.classList.toggle('clinic');
                                nestedMenu.current.classList.toggle('d-none');
                                nestedMenu.current.childNodes.forEach(child => {
                                    child.classList.toggle('clinic-li');
                                });
                            }}><a>العيادات</a></li>
                            <div
                            ref={nestedMenu}
                            className="nested-menu-container d-none"
                            >
                                <li className="clinic-li clinic-color">
                                    <a>العيادات 1</a>
                                </li>
                                <li className="clinic-li clinic-color">
                                    <a>العيادات 2</a>
                                </li>
                                <li className="clinic-li clinic-color">
                                    <a>العيادات 3</a>
                                </li>
                            </div>*/}
                           {role=="Patient"?
                            <>
                                <li><Link to={"/Layout/MainSocial"}>المنشورات</Link></li>
                                <li><Link to={"/Layout/BooksHistory"}>سجل الحجوزات</Link></li>
                                <li><Link to={"/Layout/History"}>السجل المرضي</Link></li>
                                <li onClick={()=>{Logout();}}><span className='logout'>تسجيل خروج</span></li>
                            </>:role=="Doctor"?
                            <>
                                <li><Link to={"/Layout/AddPost"}>اضافة منشور</Link></li>
                                <li><Link to={"/Layout/DoctorReservation"}>حجوزات اليوم</Link></li>
                                <li onClick={()=>{Logout();}}><span className='logout'>تسجيل خروج</span></li>
                            </>:role=="Admin"?
                            <>
                                <li><Link to="/Layout/DoctorSignup">اضافة طبيب</Link></li>
                                <li><Link to="/Layout/DoctorTable">سجل الاطباء</Link></li>
                                <li><Link to="/Layout/PatientTable">سجل المرضى</Link></li>
                                <li onClick={()=>{Logout();}}><span className='logout'>تسجيل خروج</span></li>
                            </>:
                            <>
                                <li><Link to={"/Layout/MainSocial"}>المنشورات</Link></li>
                                <li><Link to="/Layout/SignUp">انشاء حساب</Link></li>
                                <li><Link to="/Layout/Login">تسجيل الدخول</Link></li>
                            </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <Outlet />
    </>
  )
}
