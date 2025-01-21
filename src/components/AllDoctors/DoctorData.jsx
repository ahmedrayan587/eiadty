import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Post from '../Social/Post'
import DoctorMain from './DoctorMain'
import { host } from '../../utils/APIRoutes';

export default function DoctorData({patientPhone,role}) {
  let { state } = useLocation();
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetchData();
    console.log(post);
    console.log(role)
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`${host}/Posts/GetAllDoctorPosts?phone=${state.data.data.phone}`);

      if (response.status === 200) {
        setPost(response.data);
      } else {
        console.error('Error fetching data:', response);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  };
  return (
    <>
        <DoctorMain name={'د/ ' + state.data.data.name}
          specialty={state.data.data.department}
          location={state.data.data.governrate + ", "+state.data.data.city+", "+state.data.data.adreess}
          availability={`${state.data.data.fromDay} إلى ${state.data.data.toDay}، من الساعة ${state.data.data.fromHour}  حتى ${state.data.data.toHour}`}
          phone={state.data.data.phone}
          newcheck={state.data.data.newCheckPrie}
          recheck={state.data.data.reCheckPrie}
          role={role}
        />  
        <div className='container'>
            <h2>المنشورات</h2>
            {post.map((p, index) => (
              <Post
              key={index}
              patientPhone={patientPhone}
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
