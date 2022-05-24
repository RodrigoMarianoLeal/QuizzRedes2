/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import {
  Form, Button, Container, Col, Row, Dropdown, DropdownButton,
} from 'react-bootstrap';
import axios from '../../utils/api';
import './quizz.css';
import QuizzCard from '../../components/QuizzCard';
import temas from '../../utils/temas';
import dificuldade from '../../utils/dificuldade';

export default function QuizzGame({ history }) {
  const initialState = {
    questions: [],
  };
  const initialStateForm = {
    category: '',
    difficulty: '',
  };

  const [state, setState] = useState(initialState);
  const [questions, setQuestions] = useState();
  const [showCardGame, setShowCardGame] = useState(false);
  const [form, setForm] = useState(initialStateForm);

  const getQuestions = async () => {
    try {
      const response = await axios.get(`api/questions?difficulty=${form.difficulty}&category=${form.category}&quantity=10`);
      setState({
        ...state,
        questions: response.data.data,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const prepareQuestions = () => {
    const newQuestions = state.questions.map((item) => ({ enunciado: item.question, correta: item.correct_answer, alternativas: item.incorrect_answers.concat([item.correct_answer]).sort(() => ((Math.random() > 0.5) ? 1 : -1)) }));
    setQuestions(newQuestions);
    console.log(newQuestions);
  };

  const getQuizzGameCard = () => {
    setShowCardGame(true);
  };
  const printQuestions = () => {
    console.log(state.questions);
  };
  const initGame = () => {

  };
  const setDifficulty = (event) => {
    setForm({
      ...form,
      difficulty: `${event}`,
    });
  };
  const setCategory = (event) => {
    setForm({
      ...form,
      category: `${event}`,
    });
  };
  return (

    <Container className="container">
      <div className="back">
        <Container>
          <Form>
            <Col>
              <Form.Group>
                <DropdownButton id="dropdown-basic-button" title={form.difficulty || 'Difficulty'} onSelect={setDifficulty}>
                  {Object.entries(dificuldade).map((key, valor) => <Dropdown.Item key={valor} eventKey={key[0]}>{key[0]}</Dropdown.Item>)}
                </DropdownButton>
              </Form.Group>
              <Form.Group>
                <DropdownButton id="dropdown-basic-button" title={form.category || 'Category'} onSelect={setCategory}>
                  {Object.entries(temas).map((key, valor) => <Dropdown.Item key={valor} eventKey={key[0]}>{key[0]}</Dropdown.Item>)}
                </DropdownButton>
              </Form.Group>
            </Col>
          </Form>
          {showCardGame ? <QuizzCard questions={questions} /> : (
            <div>
              <Button variant="primary" onClick={getQuestions}>  Iniciar</Button>
              <Button variant="secondary" onClick={prepareQuestions}>  Preparar Questões</Button>
              <Button variant="primary" onClick={getQuizzGameCard}>  Iniciar jogo</Button>
            </div>
          )}
        </Container>
      </div>
    </Container>
  );
}
