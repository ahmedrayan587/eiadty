import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TR from '../Table/TR';
import FormSelect from '../Form/FormSelect';

export default function History() {

  // Static data for patient information
  const [mainData, setMainData] = useState({
    fName: 'محمد',
    lName: 'علي',
    birthDate: '1990-01-01',
    smoke: false,
  });

  // Static data for patient checks
  const [data, setData] = useState([
    {
      id: 1,
      doctor_Name: 'دكتور أحمد محمد',
      clinic: 'عيادة الباطنة',
      date: '2023-10-01',
    },
    {
      id: 2,
      doctor_Name: 'دكتورة سارة علي',
      clinic: 'عيادة الجراحة',
      date: '2023-10-02',
    },
    {
      id: 3,
      doctor_Name: 'دكتور خالد حسن',
      clinic: 'عيادة الأطفال',
      date: '2023-10-03',
    },
  ]);

  // Static data for patient diseases
  const [diseases, setDiseases] = useState([
    { id: 1, diseases_Name: 'السكري' },
    { id: 2, diseases_Name: 'ضغط الدم' },
  ]);

  // Static data for patient operations
  const [operations, setOperations] = useState([
    { id: 1, operation_Name: 'جراحة الزائدة الدودية' },
    { id: 2, operation_Name: 'جراحة المرارة' },
  ]);

  // Static data for patient drugs
  const [drugs, setDrugs] = useState([
    { id: 1, drug_Name: 'باراسيتامول' },
    { id: 2, drug_Name: 'أوميبرازول' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');

  const filteredData = data.filter((row) => {
    const value = row[searchType === 'العيادة' ? 'clinic' : searchType === 'اسم الدكتور' ? 'doctor_Name' : searchType === 'التاريخ' ? 'date' : 'doctor_Name'].toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="subject_table">
      <h1>السجل المرضي</h1>
      <div className="table_info flex-wrap">
        <h3>بيانات المريض</h3>
        <div className="table-info-data-container">
          <h4 className="table-info-data">
            الاسم:- <span>{mainData.fName + ' ' + mainData.lName}</span>
          </h4>
          <h4 className="table-info-data">
            تاريخ الميلاد:- <span>{mainData.birthDate}</span>
          </h4>
          <h4 className="table-info-data">الامراض المزمنة:- </h4>
          <ul>
            {diseases.map((disease, index) => (
              <li key={index}>{disease.diseases_Name}</li>
            ))}
          </ul>
          <h4 className="table-info-data">العمليات السابقة:- </h4>
          <ul>
            {operations.map((operation, index) => (
              <li key={index}>{operation.operation_Name}</li>
            ))}
          </ul>
          <h4 className="table-info-data"> الادوية الدائمة :- </h4>
          <ul>
            {drugs.map((drug, index) => (
              <li key={index}>{drug.drug_Name}</li>
            ))}
          </ul>
          <h4 className="table-info-data">
            التدخين:- <span>{mainData.smoke ? 'مدخن' : 'غير مدخن'}</span>
          </h4>
        </div>
      </div>
      <div className="table-body">
        <div className="panter-container">
          <h3>سجل الكشوفات</h3>
          <button id="print" onClick={() => window.print()} className="button">
            طباعة الكشف
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="inputBox my-3 w-50">
            <input
              type="text"
              required
              onKeyUp={(event) => {
                setSearchTerm(event.target.value);
                if (event.target.value.length > 0) {
                  event.target.classList.add('typed');
                } else {
                  event.target.classList.remove('typed');
                }
              }}
            />
            <span className="user">{"ابحث"}</span>
          </div>
          <FormSelect
            key={"clinic"}
            name={"اختر نوع البحث"}
            optionsObj={['التاريخ', 'اسم الدكتور', 'العيادة']}
            setValues={setSearchType}
          />
        </div>
        <table>
          <thead>
            <TR data={['', 'اسم الدكتور', 'العيادة', 'التاريخ', '']} />
          </thead>
          <tbody>
            {filteredData.map((check, index) => (
              <TR
                key={index}
                data={[
                  index + 1,
                  check.doctor_Name,
                  check.clinic,
                  check.date,
                  <Link to={'/CheckData'} state={{ check }} className="button">
                    بيانات الكشف
                  </Link>,
                ]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}