import React, { useEffect, useRef, useState } from 'react'
import'./Layout.css'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({role}) {
    const menuIcon = useRef();
    const menuUl = useRef();
    console.log(role);
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
                <Link to="/" className="logo">عيادتي</Link>
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
                                <li><Link to={"/MainSocial"}>المنشورات</Link></li>
                                <li><Link to={"/BooksHistory"}>سجل الحجوزات</Link></li>
                                <li><Link to={"/History"}>السجل المرضي</Link></li>
                                <li><Link to={"/"}>تسجيل خروج</Link></li>
                            </>:role=="Doctor"?
                            <>
                                <li><Link to={"/AddPost"}>اضافة منشور</Link></li>
                                <li><Link to={"/DoctorReservation"}>حجوزات اليوم</Link></li>
                                <li onClick={()=>{Logout();}}><span className='logout'>تسجيل خروج</span></li>
                            </>:role=="Admin"?
                            <>
                                <li><Link to="/DoctorSignup">اضافة طبيب</Link></li>
                                <li><Link to="/DoctorTable">سجل الاطباء</Link></li>
                                <li><Link to="/PatientTable">سجل المرضى</Link></li>
                                <li onClick={()=>{Logout();}}><span className='logout'>تسجيل خروج</span></li>
                            </>:
                            <>
                                <li><Link to={"/MainSocial"}>المنشورات</Link></li>
                                <li><Link to="/SignUp">انشاء حساب</Link></li>
                                <li><Link to="/Login">تسجيل الدخول</Link></li>
                            </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}
