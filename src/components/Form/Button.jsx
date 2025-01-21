import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({name,data, path}) {
  return (
    <>
      <Link to={path} state={{ data }}  className="button" >{name}</Link>
    </>
  )
}