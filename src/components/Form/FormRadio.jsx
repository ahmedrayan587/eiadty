import React from 'react'

export default function FormRadio({ArabicName,DataArray}) {
  return (
    <div className="inf">
        <label className="lb">{ArabicName}</label>
        <div className="d-flex flex-wrap">
        {DataArray.map(data=>{
            return(
                <div key={data.value} className="d-flex align-items-center backup">
                    <input id={data.value} type="radio" name={data.name} /><label htmlFor={data.value}>
                    {data.text}</label>
                </div>
            )
        })}
        </div>
    </div>
  )
}
