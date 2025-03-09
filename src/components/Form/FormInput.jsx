import React from 'react'

export default function FormInput({name,type,minLength="",maxLength="",min="",max=""}) {
  return (
    <div className="inputBox">
      <label className='validation-text'></label>
      <input type={type} min={min} max={max} minLength={minLength} maxLength={maxLength} />
      <span className="user">{name}</span>
    </div>
  )
}
