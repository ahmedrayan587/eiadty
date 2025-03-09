import React, { useState } from 'react';
import ClinicCard from '../Cards/ClinicCard';
import ExploreMain from './ExploreMain';

export default function Explore() {
  // Static data with Arabic clinic names and types
  const [data, setData] = useState([
    {
      id: 1,
      name: 'عيادة الباطنة',
      details: 'متخصصة في تشخيص وعلاج أمراض الباطنة مثل السكري وضغط الدم.',
    },
    {
      id: 2,
      name: 'عيادة الجراحة',
      details: 'تقدم خدمات جراحية عامة وجراحات متخصصة.',
    },
    {
      id: 3,
      name: 'عيادة الأطفال',
      details: 'رعاية صحية متكاملة للأطفال من الولادة حتى المراهقة.',
    },
    {
      id: 4,
      name: 'عيادة النساء والتوليد',
      details: 'رعاية صحية للنساء وخدمات التوليد والمتابعة أثناء الحمل.',
    },
    {
      id: 5,
      name: 'عيادة العظام',
      details: 'تشخيص وعلاج أمراض العظام والمفاصل والإصابات الرياضية.',
    },
    {
      id: 6,
      name: 'عيادة القلب',
      details: 'تشخيص وعلاج أمراض القلب والأوعية الدموية.',
    },
    {
      id: 7,
      name: 'عيادة الجلدية',
      details: 'علاج الأمراض الجلدية والتجميل والليزر.',
    },
    {
      id: 8,
      name: 'عيادة الأنف والأذن والحنجرة',
      details: 'تشخيص وعلاج أمراض الأنف والأذن والحنجرة.',
    },
    {
      id: 9,
      name: 'عيادة العيون',
      details: 'فحص وعلاج أمراض العيون وإجراء العمليات الجراحية.',
    },
    {
      id: 10,
      name: 'عيادة الأسنان',
      details: 'خدمات طب الأسنان العام والتجميلي وعلاج اللثة.',
    },
  ]);

  return (
    <>
      <ExploreMain />
      <div className='container'>
        <h2>العيـادات</h2>
        {data.map((clinic, index) => (
          <ClinicCard key={index} name={clinic.name} details={clinic.details} />
        ))}
      </div>
    </>
  );
}