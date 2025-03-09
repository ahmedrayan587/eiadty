import React from 'react'
import { Link } from 'react-router-dom'

export default function FormButton({name, path, data="",submitButton}) {
  return (
    <>
      <Link to={path} state={data} ref={submitButton} className="d-none" ></Link>
      <button className="button" type='submit'>{name}</button>
    </>
  )
}
