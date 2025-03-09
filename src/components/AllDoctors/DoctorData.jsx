import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Post from '../Social/Post';
import DoctorMain from './DoctorMain';

export default function DoctorData({ patientPhone, role }) {
  let { state } = useLocation();

  // Static data for doctor posts
  const [post, setPost] = useState([
    {
      doctorPhone: '123456789',
      likesNum: 10,
      commentsNum: 5,
      postType: 'نصيحة طبية',
      doctorName: 'أحمد محمد',
      text: 'نصيحة: احرص على شرب كميات كافية من الماء يومياً للحفاظ على صحة الكلى.',
      postId: 1,
      date: '2023-10-01',
      time: '10:00',
      am_Pm: 'ص',
    },
    {
      doctorPhone: '987654321',
      likesNum: 15,
      commentsNum: 7,
      postType: 'توعية',
      doctorName: 'سارة علي',
      text: 'تذكير: لا تهمل الفحوصات الدورية للكشف المبكر عن الأمراض.',
      postId: 2,
      date: '2023-10-02',
      time: '02:30',
      am_Pm: 'م',
    },
    {
      doctorPhone: '555555555',
      likesNum: 20,
      commentsNum: 12,
      postType: 'إرشادات',
      doctorName: 'خالد حسن',
      text: 'إرشاد: تجنب الأطعمة الغنية بالدهون المشبعة للحفاظ على صحة القلب.',
      postId: 3,
      date: '2023-10-03',
      time: '09:15',
      am_Pm: 'ص',
    },
  ]);

  return (
    <>
      <DoctorMain
        name={'د/ ' + state.data.name}
        specialty={state.data.specialty}
        location={state.data.governrate + ', ' + state.data.city + ', ' + state.data.adreess}
        availability={`${state.data.fromDay} إلى ${state.data.toDay}، من الساعة ${state.data.fromHour} حتى ${state.data.toHour}`}
        phone={state.data.phone}
        newcheck={state.data.newCheckPrie}
        recheck={state.data.reCheckPrie}
        role={role}
      />
      <div className="container">
        <h2>المنشورات</h2>
        {post.map((p, index) => (
          <Post
            key={index}
            patientPhone={patientPhone}
            role={role}
            doctorPhone={p.doctorPhone}
            likesNum={p.likesNum}
            commentsNum={p.commentsNum}
            type={p.postType}
            doctorName={'د/ ' + p.doctorName}
            text={p.text}
            postId={p.postId}
            date={p.date}
            time={p.time}
            am_pm={p.am_Pm}
          />
        ))}
      </div>
    </>
  );
}