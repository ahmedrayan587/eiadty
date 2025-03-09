import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import src from '../../assets/793c95fa-b5d5-49cf-b89c-0487fd0973c5.png';
import src2 from '../../assets/64329136-3ab3-4882-8414-d607b59c88bc.png';
import src3 from '../../assets/c32d6c32-1c54-4040-8d8b-b21d67e13bd1.png';

export default function CheckData() {
  let { state } = useLocation();

  const [mainData, setMainData] = useState({
    date: '2023-10-01',
    complaint: 'ألم في الصدر',
    diagnosis: 'التهاب رئوي',
  });

  return (
    <div className="subject_table check-data">
      <div className="table_info">
        <h3>بيانات الكشف</h3>
        <div className="table-info-data-container px-5 py-2">
          <h4 className="table-info-data">
            الاسم الدكتور:- <span>{state.check.doctor_Name}</span>
          </h4>
          <h4 className="table-info-data">
            تاريخ الكشف:- <span>{mainData.date}</span>
          </h4>
          <h4 className="table-info-data">
            المشكلة : <span>{mainData.complaint}</span>
          </h4>
          <h4 className="table-info-data">
            التشخيص : <span>{mainData.diagnosis}</span>
          </h4>
          <h4 className="table-info-data">الروشتة</h4>
          <img className='w-100' src={src} alt="روشتة" />
          <h4 className="table-info-data">التحاليل</h4>
          <img className='w-100' src={src2} alt="تحاليل" />
          <h4 className="table-info-data">الاشعة</h4>
          <img className='w-100' src={src3} alt="أشعة" />
        </div>
      </div>
    </div>
  );
}