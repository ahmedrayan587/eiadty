import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import './Post.css'
import FormInput from '../Form/FormInput';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../utils/APIRoutes';

export default function Post({doctorPhone,role,patientPhone="",likesNum,commentsNum,type, text, doctorName, date, time, am_pm, postId }) {
    const [iSLiked, setISLiked] = useState(false);
    const [CommentsCount, setCommentsCount] = useState(commentsNum);
    const [likes, setLikes] = useState(likesNum);
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [postImage, setPostImage] = useState("");
    const [postVideo, setPostVideo] = useState("");
    const [doctorImage, setDoctorImage] = useState("");

    useEffect(() => {
      console.log(role);
      getDoctorImage();
      getComments();
      role=='Patient'?fetchIfUserLike():"";
    }, []);
    useEffect(() => {
      type=="ImageAndVedio"?fetchImageAndVideo():type=="Image"?fetchImage():type=="Vedio"?fetchVideo():"";
      return () => {
        doctorImage&&URL.revokeObjectURL(doctorImage);
        postImage&&URL.revokeObjectURL(postImage);
        postVideo&&URL.revokeObjectURL(postVideo);
        console.log(postImage, postVideo);
      };
    }, [postId]);
    
    async function getDoctorImage() {
        try {
          const response = await axios.get(`${host}/Files/GetDoctorImage?doctorPhone=${doctorPhone}`, {
            responseType: 'arraybuffer' // Set responseType to arraybuffer to get binary data
          });
          const blob = new Blob([response.data], { type: response.headers['image/*'] }); // Create a blob from the response data
          const objectURL = URL.createObjectURL(blob); // Create an object URL for the blob
          setDoctorImage(objectURL);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
    
    function fetchImageAndVideo(){
      fetchImage();
      fetchVideo();
    }
    async function postComments(text) {
      try {
        const response = await axios.post(`${host}/Comments/CreateNewComment`,{postId:postId,patientPhone:patientPhone,comment_Text:text});
    
        if (response.status == 200) {
          console.log('Piece data posted successfully:',response);
          setCommentsCount(CommentsCount +1);
          getComments();
        } else {
          console.error('Error posting piece data:',response);
        }
      } catch (error) {
        console.error('Error during post request:', error);
      }
    };
    async function deleteComments(number) {
      try {
        const response = await axios.delete(`${host}/Comments/DeleteComment?postId=${postId}&commentNumbre=${number}`);
    
        if (response.status == 200) {
          console.log('Piece data posted successfully:',response);
          setCommentsCount(CommentsCount -1);
          getComments();
        } else {
          console.error('Error posting piece data:',response);
        }
      } catch (error) {
        console.error('Error during post request:', error);
      }
    };
    
    async function getComments() {
      try {
        const response = await axios.get(`${host}/Comments/GetPostComments?postId=${postId}`);
  
        if (response.status === 200) {
          console.log(response.data);
          setAllComments(response.data);
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    };
    async function fetchToggleLike() {
      try {
        const response = await axios.post(`${host}/Likes/PostLikes?postId=${postId}&patientPhone=${patientPhone}`);
        if (response.status === 200) {
          setLikes(iSLiked?likes-1:likes+1);
          role=='Patient'?fetchIfUserLike():"";
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    };
    async function fetchIfUserLike() {
      try {
        const response = await axios.get(`${host}/Likes/IfUserAddLike?postId=${postId}&patientPhone=${patientPhone}`);
  
        if (response.status === 200) {
          setISLiked(response.data);
        } else {
          console.error('Error fetching data:', response);
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    };
    async function fetchImage() {
      try {
        const response = await axios.get(`${host}/Files/GetPostImage?postId=${postId}`, {
          responseType: 'arraybuffer' // Set responseType to arraybuffer to get binary data
        });
          if (response.status === 200) {
            const blob = new Blob([response.data], { type: response.headers['image/*'] }); // Create a blob from the response data
            const objectURL = URL.createObjectURL(blob); // Create an object URL for the blob
            setPostImage(objectURL);
          } else {
            console.error('Error fetching data:', response);
          }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    async function fetchVideo() {
      try {
        const response = await axios.get(`${host}/Files/GetPostVedio?postId=${postId}`, {
          responseType: 'arraybuffer' // Set responseType to arraybuffer to get binary data
        });
        if (response.status === 200) {
          const blob = new Blob([response.data], { type: response.headers['video/*'] }); // Create a blob from the response data
          const objectURL = URL.createObjectURL(blob); // Create an object URL for the blob
          setPostVideo(objectURL);
        } else {
          console.error('Error fetching data:', response);
        }
        
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    async function deletePost() {
      try {
        const response = await axios.delete(`${host}/Posts/DeletePost?postId=${postId}`);
    
        if (response.status == 200) {
          console.log('Piece data posted successfully:',response);

        } else {
          console.error('Error posting piece data:',response);
        }
      } catch (error) {
        console.error('Error during post request:', error);
      }
    };
    useEffect(()=>{
        if(comment.key =="Enter"&&comment.target.value!=""){
            postComments(comment.target.value);
            setTimeout(() => {
                comment.target.value="";
                comment.target.classList.remove("typed");
            }, 50);
            
        }
    },[comment.key])
  return (
    <div className="post">
      {role=="Doctor"||role=="Admin"?
        <button className='delete-post' onClick={()=>{
            toast.warning(
              <div className="custom-toast">
                <p>هل تريد تأكيد حذف المنشور؟</p>
                <div className='d-flex justify-content-evenly align-items-center'>
                <button className='btn btn-success' onClick={() => {
                  deletePost();
                  toast.dismiss();
                  window.location.reload();}}>
                  نعم
                </button>
                <button className='btn btn-danger' onClick={() => {toast.dismiss();}}>لا</button>
                </div>
              </div>,
            {
              autoClose:false,
              closeOnClick:false,
              closeButton:false,
            });
          }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="color-red bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
        </svg>
        </button>:""}
      {(postImage||postVideo)?<div className={(postImage&&postVideo)?'image-video-container  both':'image-video-container '}>
      {postImage&&<img className={'post-image '} src={postImage} alt="Post" />}
      {postVideo&&<video className={'post-image '} controls src={postVideo} alt="Post" />}
    </div>:""}
      <p>{text}</p>
      <Link to="/Layout/DoctorData" className='d-flex w-100 m-3'>
      {doctorImage && <img className='small-image' src={doctorImage} alt="Post" />}
      <p>{doctorName}</p>
      </Link>
      <pre>{`${time} ${am_pm} ${date}`}</pre>
      <div className='d-flex justify-content-between align-items-start w-100 my-3'>
            <div className='d-flex justify-content-start'>
            {role=='Patient'?<button className='like' onClick={()=>{fetchToggleLike();}}>
            {iSLiked ? <AiFillLike /> : <AiOutlineLike />}
            </button>:""}
            </div>
            <div className='d-flex justify-content-start'>
              <p className='interact'>اعجبني: {likes}</p>
              <p className='interact'>التعليقات: {CommentsCount}</p>
            </div>
      </div>
      {role=='Patient'?<FormInput name={"التعليقات"} type={"text"} minLength={0} maxLength={500} setValues={setComment}/>:""}
      <div className="comments">
        {allComments.map((comment, index) => (
          comment&&<div className='comment-compo' key={index}>
                      <div>
                        <span className='comment-user'>{comment.patientName}</span>
                        <p>{comment.comment_Text}</p>
                      </div>
                      {(comment.patientPhone==patientPhone||role=='Doctor'||role=="Admin")?<button 
                      onClick={()=>{
                        toast.warning(
                          <div className="custom-toast">
                            <p>هل تريد تأكيد حذف التعليق؟</p>
                            <div className='d-flex justify-content-evenly align-items-center'>
                            <button className='btn btn-success' onClick={() => {
                              deleteComments(comment.number);
                              toast.dismiss();}}>
                              نعم
                            </button>
                            <button className='btn btn-danger' onClick={() => {toast.dismiss();}}>لا</button>
                            </div>
                          </div>,
                        {
                          autoClose:false,
                          closeOnClick:false,
                          closeButton:false,
                        });
                      }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="color-red bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                      </svg>
                      </button>:""}
                    </div>
        ))}
      </div>
    </div>
  )
}
