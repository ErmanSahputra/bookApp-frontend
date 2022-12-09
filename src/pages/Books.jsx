import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {Button, Card, Container, Row, Col } from 'react-bootstrap';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id)
      window.location.reload()
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div>
      <h1>Daftar Buku Favorit</h1>
      <Button variant="warning" className='mb-3'>
        <Link className='add' to={"/add"}>Add new book</Link>
      </Button>
      <Container>
        <Row>
          {books.map(book => (
            <Col className='mb-3'>
              <Card style={{ width: '18rem' }} key={book.id} className="books">
                {book.cover && <Card.Img variant="top" src={book.cover} alt="" />}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    {book.desc}
                  </Card.Text>
                  <Card.Text>$ {book.price}</Card.Text>
                  <Button variant="warning" className='m-2' >
                    <Link className='update' to={`/update/${book.id}`}>Update</Link>
                  </Button>
                  <Button className='delete' onClick={() => handleDelete(book.id)} variant="primary">
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Books
