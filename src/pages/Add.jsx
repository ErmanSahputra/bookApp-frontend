import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book,setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook(prev=> ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnclick = async e =>{
    e.preventDefault();
    try{
        await axios.post("http://localhost:8800/books", book)
        navigate("/")
    }catch(err){
        console.log(err);
    };
  };

  console.log(book);
  return (
    <div className='form'>
        <h1>Add New Book</h1>
        <input type="text" placeholder='Masukan Judul Buku'  onChange={handleChange} name="title"/>
        <input type="text" placeholder='Masukan Descripsi Buku' onChange={handleChange} name="desc"/>
        <input type="number" placeholder='Masukan Harga Buku' onChange={handleChange} name="price"/>
        <input type="text" placeholder='Masukan link .jpg/png' onChange={handleChange} name="cover"/>
        <button className='formButton' onClick={handleOnclick}>Tambah Buku</button>
    </div>
  );
};

export default Add;
