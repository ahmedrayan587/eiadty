import React, { useState } from 'react';
import FormSelect from '../Form/FormSelect';
import TR from '../Table/TR';

export default function BooksHistory() {
  // Static data with Arabic booking details
  const [books, setBooks] = useState([
    {
      id: 1,
      doctor_Name: 'دكتور أحمد محمد',
      date: '2023-10-01',
      time: '10:00 ص',
      book_Type: 'newCheck',
    },
    {
      id: 2,
      doctor_Name: 'دكتورة سارة علي',
      date: '2023-10-02',
      time: '11:30 ص',
      book_Type: 'consultation',
    },
    {
      id: 3,
      doctor_Name: 'دكتور خالد حسن',
      date: '2023-10-03',
      time: '02:00 م',
      book_Type: 'newCheck',
    },
    {
      id: 4,
      doctor_Name: 'دكتورة فاطمة محمود',
      date: '2023-10-04',
      time: '03:30 م',
      book_Type: 'consultation',
    },
    {
      id: 5,
      doctor_Name: 'دكتور عمر عبدالله',
      date: '2023-10-05',
      time: '09:00 ص',
      book_Type: 'newCheck',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');

  const filteredData = books.filter((row) => {
    const value = row[searchType === 'اسم الدكتور' ? 'doctor_Name' : searchType === 'التاريخ' ? 'date' : 'doctor_Name'].toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="subject_table">
      <h1>سجل الكشوفات</h1>
      <div className="table-body py-5">
        <div className="d-flex justify-content-between align-items-center">
          <div className="inputBox my-3 w-50">
            <input
              type="text"
              required
              onKeyUp={(event) => {
                setSearchTerm(event.target.value);
                if (event.target.value.length > 0) {
                  event.target.classList.add('typed');
                } else {
                  event.target.classList.remove('typed');
                }
              }}
            />
            <span className="user">{"ابحث"}</span>
          </div>
          <FormSelect
            key={"clinic"}
            name={"اختر نوع البحث"}
            optionsObj={['اسم الدكتور', 'التاريخ']}
            setValues={setSearchType}
          />
        </div>
        <table>
          <thead>
            <TR data={['العدد', 'اسم الدكتور', 'التاريخ', 'الوقت', 'نوع الكشف']} />
          </thead>
          <tbody>
            {filteredData.map((book, index) => (
              <TR
                key={index}
                data={[
                  index + 1,
                  book.doctor_Name,
                  book.date,
                  book.time,
                  book.book_Type === 'newCheck' ? 'كشف' : 'استشارة',
                ]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}