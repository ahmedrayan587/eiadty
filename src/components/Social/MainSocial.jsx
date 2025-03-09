import React, { useState } from 'react';
import Post from './Post';

export default function MainSocial({ patientPhone, role }) {
  // Static data for posts
  const [post, setPost] = useState([
    {
      doctorPhone: '123456789',
      likesNum: 10,
      commentsNum: 2,
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
      commentsNum: 2,
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
      commentsNum: 2,
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
    <div className="container flex-column">
      <h2>التواصل الاجتماعي</h2>
      {post.map((p, index) => (
        <Post
          key={index}
          patientPhone={patientPhone}
          role={role}
          likesNum={p.likesNum}
          commentsNum={p.commentsNum}
          doctorName={'د/ ' + p.doctorName}
          text={p.text}
          date={p.date}
          time={p.time}
          am_pm={p.am_Pm}
        />
      ))}
    </div>
  );
}