import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import { host } from '../../utils/APIRoutes';

export default function MainSocial({patientPhone,role}) {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetchData();
    console.log(post);
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`${host}/Posts/GetAllPosts`);

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
    <div className='container flex-column'>
        <h2>التواصل الاجتماعي</h2>
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
  )
}
