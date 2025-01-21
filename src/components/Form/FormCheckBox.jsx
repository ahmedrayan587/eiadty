import React from 'react'

export default function FormCheckBox({ArabicName,DataArray,setValues}) {
  return (
    <div className="inf">
        <label className="lb">{ArabicName}</label>
        <div className="d-flex flex-wrap">
        {DataArray.map((data,index)=>{
            return(
                <div key={index} className="d-flex align-items-center backup">
                    <input id={data.value} type="checkbox" name={data.name} onChange={((event)=>{setValues[index](event.target.checked)})}/><label htmlFor={data.value}>
                    {data.text}</label>
                </div>
            )
        })}
        </div>
    </div>
  )
}
