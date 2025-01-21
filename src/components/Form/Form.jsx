import React, { useState } from 'react'
import "./Form.css"

export default function Form({name,submitFunction,components}) {
  const [validationText,setValidationText] = useState("");
  return (
    <div key={name} className="container">
      <form className="card" onSubmit={submitFunction}>

        {components?.map((component,index) =>{
            return(
                <React.Fragment key={index}>
                  {component}
                  {index==3?
                    <div className={"inputBox "+`${validationText==""?"d-none":""}`}>
                      <label className='validation-text'>{validationText}</label>
                    </div>:""
                  }
                </React.Fragment>
            );
        })}
        
      </form>
    </div>
  )
}
