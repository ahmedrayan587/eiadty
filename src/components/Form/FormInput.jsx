import React from 'react'

export default function FormInput({name,type,minLength="",maxLength="",min="",max="",setValues}) {
  return (
    <div className="inputBox">
      <label className='validation-text'></label>
      <input type={type} min={min} max={max} required="required" minLength={minLength} maxLength={maxLength} onKeyUp={(event)=>{
            setValues(event.target.value);
            if(event.target.value.length > 0){
              event.target.classList.add('typed'); 
            }else{
              event.target.classList.remove('typed');
            }
            if(!event.target.checkValidity()){
                event.target.previousElementSibling.textContent = `يجب ان لا يقل عن ${minLength} ارقام.`;
                event.target.previousElementSibling.style.color = "crimson";        
            }else{
                event.target.previousElementSibling.textContent = "مطابق للمواصفات";
                event.target.previousElementSibling.style.color = "forestgreen";
            }
            if(minLength == maxLength&& maxLength == 11){
              event.target.value = event.target.value.replace(/[^0-9]/g,"");
              if(event.target.value.length < minLength){
                event.target.previousElementSibling.textContent = `يجب ان لا يحتوي رقم التليفون علي حروف و يجب ان لا يقل عن ${minLength} ارقام.`;
                event.target.previousElementSibling.style.color = "crimson";   
              } 
            }
            if(type == "time"&&!event.target.checkValidity()){
              event.target.previousElementSibling.textContent = `يجب ان يتراوح الموعد بين الساعة ${min} و ${max}`;
              event.target.previousElementSibling.style.color = "crimson";
            }
            if(type == "date"&&!event.target.checkValidity()){
              event.target.previousElementSibling.textContent = `يجب ان يتراوح التاريخ بين  ${min} و ${max}`;
              event.target.previousElementSibling.style.color = "crimson";
            }
            if(name == "التعليقات"||name=="الامراض المزمنة"||name=="العمليات السابقة"||name=="الادوية االدائمة"){
              setValues(event);
              event.target.previousElementSibling.textContent = "";
            }
        }}  
        onChange={(event)=>{
          setValues(event.target.value);
          if(type == "time"&&!event.target.checkValidity()){
            event.target.previousElementSibling.textContent = `يجب ان يتراوح الموعد بين الساعة ${min} و ${max}`;
            event.target.previousElementSibling.style.color = "crimson";
          }
          if(type == "date"&&!event.target.checkValidity()){
            event.target.previousElementSibling.textContent = `يجب ان يتراوح التاريخ بين  ${min} و ${max}`;
            event.target.previousElementSibling.style.color = "crimson";
          }
        }} />
      <span className="user">{name}</span>
    </div>
  )
}
