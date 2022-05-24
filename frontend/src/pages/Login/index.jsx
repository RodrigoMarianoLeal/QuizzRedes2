import React, { useState, useEffect } from 'react';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.css';
import axios from '../../utils/api';

import { useAuth } from '../../hooks/auth';

export default function EditUser({ history }) {
  const { id } = useParams();

  const { signIn } = useAuth();

  const isNewUser = id === 'new';

  const initialState = {
    email: '',
    password: '',
  };

  const [form, setForm] = useState(initialState);

  const isFormValid = form.email && form.password;

  const fetchUser = async () => {
    const response = await axios.get(`/user/${id}`);
    setForm(response.data);
  };

  useEffect(() => {
    if (!isNewUser) {
      fetchUser();
    }
  }, []);

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

    try {
      const res = await signIn(form);
      if (res === undefined) {
        toast.info('Usuario logado com sucesso!');

        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="container">
      <div className="back">
        <Form onSubmit={onSubmit}>
          <p className="title"> Login</p>
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
          <Row>
            <Col>
              <Button className="button" disabled={!isFormValid} type="submit">
                Login
              </Button>
            </Col>
            <Col>
              <Button className="button">
                Sign up
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}
