import React from 'react'
import './Table.css'

export default function TableMain({name,content}) {
  return (
    <div className="table_info">
        <h4>{name}</h4>
        <h4>{content}</h4>
        <div className="panter-container">
        <button id="print" onClick={()=>{window.print()}} className="panter">
            طباعة الكشف
        </button>
        </div>
    </div>
  )
}
