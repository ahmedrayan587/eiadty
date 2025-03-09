import React, { useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import './Post.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import image from "../../assets/1669490451644.jpg";
import image2 from "../../assets/c32d6c32-1c54-4040-8d8b-b21d67e13bd1.png";
import image3 from "../../assets/90f88296-75a6-4c60-9f67-e2f121ca625c.png";
import image4 from "../../assets/5a7e59f1-a728-49fd-a8a6-75eaf9cb3424.png";
import 'react-toastify/dist/ReactToastify.css';

export default function Post({ role, patientPhone = "", likesNum, commentsNum, text, doctorName, date, time, am_pm }) {
  const [iSLiked, setISLiked] = useState(false);
  const [CommentsCount, setCommentsCount] = useState(commentsNum);
  const [likes, setLikes] = useState(likesNum);
  const [allComments, setAllComments] = useState([
    {
      patientName: 'محمد علي',
      comment_Text: 'شكراً على النصيحة القيمة!',
      number: 1,
      patientPhone: '123456789',
    },
    {
      patientName: 'سارة أحمد',
      comment_Text: 'معلومات مفيدة جداً.',
      number: 2,
      patientPhone: '987654321',
    },
  ]);
  const [postImage, setPostImage] = useState(image2);
  const [postVideo, setPostVideo] = useState("");
  const [doctorImage, setDoctorImage] = useState(image);

  // Simulate toggling like
  const fetchToggleLike = () => {
    setLikes(iSLiked ? likes - 1 : likes + 1);
    setISLiked(!iSLiked);
  };

  // Simulate posting a comment
  const postComments = (text) => {
    const newComment = {
      patientName: 'مستخدم جديد',
      comment_Text: text,
      number: allComments.length + 1,
      patientPhone: '000000000',
    };
    setAllComments([...allComments, newComment]);
    setCommentsCount(CommentsCount + 1);
  };

  // Simulate deleting a comment
  const deleteComments = (number) => {
    const updatedComments = allComments.filter((comment) => comment.number !== number);
    setAllComments(updatedComments);
    setCommentsCount(CommentsCount - 1);
  };

  // Simulate deleting a post
  const deletePost = () => {
    toast.success('تم حذف المنشور بنجاح!');
  };

  return (
    <div className="post">
      {role === "Doctor" || role === "Admin" ? (
        <button
          className="delete-post"
          onClick={() => {
            toast.warning(
              <div className="custom-toast">
                <p>هل تريد تأكيد حذف المنشور؟</p>
                <div className="d-flex justify-content-evenly align-items-center">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      deletePost();
                      toast.dismiss();
                      window.location.reload();
                    }}
                  >
                    نعم
                  </button>
                  <button className="btn btn-danger" onClick={() => toast.dismiss()}>
                    لا
                  </button>
                </div>
              </div>,
              {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
              }
            );
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="color-red bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
          </svg>
        </button>
      ) : (
        ""
      )}

      {(postImage || postVideo) && (
        <div className={postImage && postVideo ? "image-video-container both" : "image-video-container"}>
          {postImage && <img className="post-image" src={postImage} alt="Post" />}
          {postVideo && <video className="post-image" controls src={postVideo} alt="Post" />}
        </div>
      )}

      <p>{text}</p>
      <Link to="/Layout/DoctorData" className="d-flex w-100 m-3">
        {doctorImage && <img className="small-image" src={doctorImage} alt="Doctor" />}
        <p>{doctorName}</p>
      </Link>
      <pre>{`${time} ${am_pm} ${date}`}</pre>

      <div className="d-flex justify-content-between align-items-start w-100 my-3">
        <div className="d-flex justify-content-start">
          {role === "Patient" && (
            <button className="like" onClick={fetchToggleLike}>
              {iSLiked ? <AiFillLike /> : <AiOutlineLike />}
            </button>
          )}
        </div>
        <div className="d-flex justify-content-start">
          <p className="interact">اعجبني: {likes}</p>
          <p className="interact">التعليقات: {CommentsCount}</p>
        </div>
      </div>

      {role === "Patient" && (
        <div className="inputBox">
          <label className='validation-text'></label>
          <input type="text" minLength="0" maxLength="500" onKeyUp={(e)=>{
            if (e.key === "Enter" && e.target.value !== "") {
              postComments(e.target.value);
              setTimeout(() => {
                e.target.value = "";
                e.target.classList.remove("typed");
              }, 50);
            }
          }} />
          <span className="user">التعليقات</span>
        </div>
      )}

      <div className="comments">
        {allComments.map((comment, index) => (
          comment && (
            <div className="comment-compo" key={index}>
              <div>
                <span className="comment-user">{comment.patientName}</span>
                <p>{comment.comment_Text}</p>
              </div>
              {(comment.patientPhone === patientPhone || role === "Doctor" || role === "Admin") && (
                <button
                  onClick={() => {
                    toast.warning(
                      <div className="custom-toast">
                        <p>هل تريد تأكيد حذف التعليق؟</p>
                        <div className="d-flex justify-content-evenly align-items-center">
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              deleteComments(comment.number);
                              toast.dismiss();
                            }}
                          >
                            نعم
                          </button>
                          <button className="btn btn-danger" onClick={() => toast.dismiss()}>
                            لا
                          </button>
                        </div>
                      </div>,
                      {
                        autoClose: false,
                        closeOnClick: false,
                        closeButton: false,
                      }
                    );
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="color-red bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </button>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}