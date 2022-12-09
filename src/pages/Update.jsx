import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const Update = () => {
  const [book,setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook(prev=> ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnclick = async e =>{
    e.preventDefault();
    try{
        await axios.put("http://localhost:8800/books/" + bookId, book);
        navigate("/");
    }catch(err){
        console.log(err);
    };
  };

  console.log(book);
  return (
    <div className='form'>
        <h1>Update the Book</h1>
        <input type="text" placeholder='Masukan Judul Buku' onChange={handleChange} name="title" required="true"/>
        <input type="text" placeholder='Masukan Descripsi Buku' onChange={handleChange} name="desc" />
        <input type="number" placeholder='Masukan Harga Buku' onChange={handleChange} name="price"/>
        <input type="text" placeholder='Masukan link .jpg/png' onChange={handleChange} name="cover"/>
        <button className='formButton' onClick={handleOnclick}> Update </button>
    </div>
  );
};

export default Update;
