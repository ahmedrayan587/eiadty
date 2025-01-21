import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../Social/Post';
import { useLocation } from 'react-router-dom';
import { host } from '../../utils/APIRoutes';

export default function DoctorAllPosts() {
    const [post, setPost] = useState([]);
    const location = useLocation();
    const doctorPhone = location.state.doctorPhone;
    console.log(doctorPhone)
    useEffect(()=>{
        doctorPhone&&getDoctorPosts();
    },[doctorPhone])
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
    <div className='container'>
        <h2>المنشورات</h2>
        {post.map((p, index) => (
          <Post
            key={index}
            role="Admin"
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
  )
}
