import React, { useRef, useState } from 'react';

export default function FormSelect({name , optionsObj,setValues}) {
    const selectValue = useRef();
    const options = useRef();
  return (
    <div className="inputBox custom-select-wraper">
        <input
        className="custom-select"
        required="required"
        ref={selectValue}
        onFocus={()=>{
            options.current.style.display = "block";
        }}
        onKeyUp={(event)=>{
            event.target.value = "";
        }}
        onBlur={()=>{setTimeout(() => {
            options.current.style.display = "none";
        }, 250);}}
        />
        <span className="span">{name}</span>
        <div className="custom-options" ref={options}>
            {optionsObj.map((opt)=>{
                return(
                    <div key={opt}
                     onFocus={()=>{selectValue.current.focus()}}
                     onClick={(event)=>{
                        selectValue.current.value = event.target.textContent;
                        setValues(event.target.textContent);
                        
                        
                    }}>{opt}</div>
                );
            })}
        </div>
    </div>
  )
}
