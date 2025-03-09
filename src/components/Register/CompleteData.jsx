import { Link } from 'react-router-dom'
import FormTitle from '../Form/FormTitle';
import FormInput from '../Form/FormInput';
import "./CompleteData.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CompleteData() {
  /*chronics */

  return (
        <div className="container">
          <div className="card">
          <FormTitle key={"title"} name="استكمال البيانات" />
          <FormInput name={"الامراض المزمنة"} type={"text"} minLength={0} maxLength={500} />
          <div className="complete-container">
            {allChronics.map((chronic, index) => (
              chronic&&<div className='complete-compo' key={index}>
                          <p>{chronic.diseases_Name}</p>
                          <button
                            onClick={()=>{
                              toast.warning(
                                <div className="custom-toast">
                                  <p>هل تريد تأكيد حذف الصورة؟</p>
                                  <div className='d-flex justify-content-evenly align-items-center'>
                                  <button className='btn btn-success' onClick={() => {
                                    deleteChronics(chronic.diseases_Name);
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
                          </button>
                        </div>
            ))}
          </div>
          <FormInput name={"العمليات السابقة"} type={"text"} minLength={0} maxLength={500} setValues={setSurgeries}/>
          <div className="complete-container">
            {allSurgeries.map((surgeries, index) => (
              surgeries&&<div className='complete-compo' key={index}>
                          <p>{surgeries.operation_Name}</p>
                          <button
                            onClick={()=>{
                              toast.warning(
                                <div className="custom-toast">
                                  <p>هل تريد تأكيد حذف الصورة؟</p>
                                  <div className='d-flex justify-content-evenly align-items-center'>
                                  <button className='btn btn-success' onClick={() => {
                                    deleteSurgeries(surgeries.operation_Name);
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
                          </button>
                        </div>
            ))}
          </div>
          <FormInput name={"الادوية االدائمة"} type={"text"} minLength={0} maxLength={500} setValues={setPharmaceutical}/>
          <div className="complete-container">
            {allPharmaceutical.map((pharmaceutical, index) => (
              pharmaceutical&&<div className='complete-compo' key={index}>
                          <p>{pharmaceutical.drug_Name}</p>
                          <button  
                            onClick={()=>{
                              toast.warning(
                                <div className="custom-toast">
                                  <p>هل تريد تأكيد حذف الصورة؟</p>
                                  <div className='d-flex justify-content-evenly align-items-center'>
                                  <button className='btn btn-success' onClick={() => {
                                    deletePharmaceutical(pharmaceutical.drug_Name);
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
                          </button>
                        </div>
            ))}
          </div>
          <Link to={'/Explore'} className="button" >انهاء</Link>
          </div>
        </div>
  )
}
