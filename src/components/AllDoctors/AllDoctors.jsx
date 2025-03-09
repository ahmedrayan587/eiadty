import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AllDoctors.css';
import DoctorCard from '../Cards/DoctorCard';
import image from "../../assets/1669490451644.jpg"

export default function AllDoctors() {
  // Static data with Arabic doctor names and details
  const [data, setData] = useState([
    {
      id: 1,
      image: image,
      name: 'دكتور أحمد محمد',
      specialty: 'أخصائي باطنة',
      clinic: 'عيادة الباطنة',
      details: 'خبرة أكثر من 10 سنوات في تشخيص وعلاج أمراض الباطنة.',
    },
    {
      id: 2,
      image: image,
      name: 'دكتورة محمد علي',
      specialty: 'أخصائية جراحة',
      clinic: 'عيادة الجراحة',
      details: 'متخصصة في الجراحات العامة وجراحات المناظير.',
    },
    {
      id: 3,
      image: image,
      name: 'دكتور خالد حسن',
      specialty: 'أخصائي أطفال',
      clinic: 'عيادة الأطفال',
      details: 'رعاية صحية متكاملة للأطفال من الولادة حتى المراهقة.',
    },
    {
      id: 4,
      image: image,
      name: 'دكتورة احمد محمود',
      specialty: 'أخصائية نساء وتوليد',
      clinic: 'عيادة النساء والتوليد',
      details: 'رعاية صحية للنساء وخدمات التوليد والمتابعة أثناء الحمل.',
    },
    {
      id: 5,
      image: image,
      name: 'دكتور عمر عبدالله',
      specialty: 'أخصائي عظام',
      clinic: 'عيادة العظام',
      details: 'تشخيص وعلاج أمراض العظام والمفاصل والإصابات الرياضية.',
    },
  ]);

  let { state } = useLocation();
  return (
    <div className='container'>
      <h2>أطباء {state.name}</h2>
      {data.map((doctor, index) => (
        state.name == doctor.clinic&&<DoctorCard key={index} data={doctor} />
      ))}
    </div>
  );
}