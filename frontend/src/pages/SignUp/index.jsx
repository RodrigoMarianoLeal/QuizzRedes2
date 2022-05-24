import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './singUp.css';
import axios from '../../utils/api';

export default function EditUser({ history }) {
  const { id } = useParams();

  const isNewUser = true;

  const initialState = {
    email: '',
    name: '',
    password: '',
  };

  const [form, setForm] = useState(initialState);

  const isFormValid = form.email && form.name;

  const fetchUser = async () => {
    const response = await axios.get(`/user/${id}`);
    setForm(response.data);
  };
  /*
  useEffect(() => {
    if (!isNewUser) {
      fetchUser();
    }
  }, []);
  */

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid) {
      try {
        if (isNewUser) {
          await axios.post('/user', form);
          toast.info('User created success');
        } else {
          await axios.put(`/user/${id}`, form);
          toast.info('User updated success');
        }
        // history.push('/user');
      } catch (e) {
        toast.error('An unexpected error happened');
      }
    } else {
      toast.error('Form invalid');
    }
  };

  return (
    <Container className="container">
      <div className="back">
        <Form onSubmit={onSubmit}>
          <p className="title"> Sing Up</p>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={form.name}
              name="name"
              type="text"
              required
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={form.email}
              name="email"
              type="email"
              required
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={form.password}
              name="password"
              type="password"
              required
              onChange={onChange}
            />
          </Form.Group>
          <Button disabled={!isFormValid} type="submit">
            Save
          </Button>
        </Form>
      </div>
    </Container>
  );
}
