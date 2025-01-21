import React from 'react'
import Canvas from '../Canvas/Canvas'
import Button from '../Form/Button'
import "./Landing.css"

export default function Landing() {
  return (
    <div className="landing-container">
        <Canvas />
        <div className="content">
            <div
                className="d-flex flex-column justify-content-center align-items-center flex-wrap"
            >
                <p>
                نقدم مجموعة واسعة من الخدمات الطبية عبر عياداتنا المتخصصة. استفد من
                فريق طبي متخصص لتلبية احتياجاتك الصحية.
                </p>
                {/*<Button name="انشاء طبيب" path="/Layout/DoctorSignup" />*/}
                <Button name="انشاء حساب" path="/Layout/SignUp" />
                <Button name="تسجيل الدخول" path="/Layout/Login" />
                <Button name="استكشاف الخدمات" path="/Layout/Explore" />
            </div>
        </div>
    </div>
  )
}
