import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../Social/Post';
import DoctorMain from '../AllDoctors/DoctorMain';
import { host } from '../../utils/APIRoutes';

export default function DoctorPersonal({doctorPhone,role}) {
  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);
  useEffect(() => {
    doctorPhone&&getDoctorData();
    doctorPhone&&getDoctorPosts();
  }, [doctorPhone]);

  async function getDoctorData() {
    try {
      const response = await axios.get(`${host}/Doctors/GetDoctorById?phone=${doctorPhone}`);

      if (response.status === 200) {
        setTimeout(() => {
          setData(response.data);
        }, 50);
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };
  async function getDoctorPosts() {
    try {
      const response = await axios.get(`${host}/Posts/GetAllDoctorPosts?phone=${doctorPhone}`);

      if (response.status === 200) {
        setTimeout(() => {
          setPost(response.data);
        }, 50);
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };
  return (
    <>
    <DoctorMain name={'د/ ' + data.name}
      specialty={data.department}
      location={data.governrate + ", "+data.city+", "+data.adreess}
      availability={`${data.fromDay} إلى ${data.toDay}، من الساعة ${data.fromHour}  حتى ${data.toHour}`}
      phone={data.phone}
      newcheck={data.newCheckPrie}
      recheck={data.reCheckPrie}
      dnone='d-none'
      role={role}
    />  
    <div className='container'>
        <h2>المنشورات</h2>
        {post.map((p, index) => (
          <Post
            key={index}
            role={role}
            doctorPhone={p.doctorPhone}
            likesNum={p.likesNum}
            commentsNum={p.commentsNum}
            type = {p.postType}
            doctorName={'د/ ' + p.doctorName}
            text={p.text}
            postId={p.postId}
            date={p.date} time={p.time} am_pm={p.am_Pm}
          />
        ))}
    </div>
</>
  )
}
