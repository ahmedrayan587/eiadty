import React from 'react'
import './Table.css'

export default function TR({data}) {
  return (
    <tr>
        {data?.map((element,index) =>{
            return(
                  <td key={index}>{element}</td>
            );
        })}
    </tr>
  )
}
