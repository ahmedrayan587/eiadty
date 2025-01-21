import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormSelect from '../Form/FormSelect';
import TR from '../Table/TR';
import { host } from '../../utils/APIRoutes';

export default function BooksHistory({patientPhone}) {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {
            const response = await axios.get(`${host}/Books/GetAllPatientBooks?patient_Phone=${patientPhone}`);

            if (response.status === 200) {
                setBooks(response.data);
                console.log(books);
            } else {
                console.error('Error fetching data:', response);
            }
        } catch (error) {
            console.error('Error during request:', error);
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('');
      const filteredData = books.filter(row => {
        const value = row[searchType=="اسم الدكتور"?'doctor_Name':searchType=="التاريخ"?'date':"doctor_Name"].toLowerCase();
        return value.includes(searchTerm);
      });
  return (
    <div className="subject_table">
        <h1>سجل الكشوفات</h1>
        <div className='table-body py-5'>
            <div className="d-flex justify-content-between align-items-center">
            <div className="inputBox my-3 w-50">
                <input type="text"  required onKeyUp={(event)=>{
                    setSearchTerm(event.target.value);
                    if(event.target.value.length > 0){
                        event.target.classList.add('typed'); 
                    }else{
                        event.target.classList.remove('typed');
                    }}} />
                <span className="user">{"ابحث"}</span>
            </div>
            <FormSelect key={"clinic"} name={"اختر نوع البحث"} optionsObj={["اسم الدكتور","التاريخ"]} setValues={setSearchType} />
            </div>
            <table>
                <thead>
                    <TR  data={["العدد","اسم الدكتور","التاريخ","الوقت","نوع الكشف"]} />
                </thead>
                <tbody>
                {filteredData.map((book, index) => (
                    <TR key={index} data={[index+1,book.doctor_Name,book.date,book.time,book.book_Type=="newCheck"?"كشف":"استشارة"]} />
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
