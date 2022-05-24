/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Container, Row, Button, Col,
} from 'react-bootstrap';
import './quizzcard.css';
import mensage from '../../utils/mensage_streak.js';

export default function QuizzCard({ questions }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionsData, setQuestions] = useState(questions);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mensageError] = useState('errou');
  const [reportMensage, setReportMensage ] = useState('');

  const checkIfCorrect = (value) => {
    if (questionsData[questionNumber].alternativas[value] === questionsData[questionNumber].correta) {
      setScore(score + 10);
      setStreak((streak + 1));
      if(streak > mensage.length-1){
        setReportMensage(mensage[mensage.length-1])
      }
      else{
        setReportMensage(mensage[streak])
      }
      
    }else {
      setReportMensage(mensageError)
      setStreak(0);
    }
    if ((questionNumber) < 9) {
      setQuestionNumber(questionNumber + 1);
    }
  };

  return (
    <div className="back">
      <Col>
        <Row className="topRow">
          <Col>
            <p className="titulo">Quizz Game</p>
          </Col>
          <Col>
            <p className="titulo">
              {`Score: ${score}`}
            </p>
            <p className="titulo">
              {`Streak: ${streak}`}
            </p>
          </Col>
          <Col>
            <p className="titulo right">
              Question Number:
              {` ${questionNumber + 1}`}
              /
              {questionsData.length}
            </p>
          </Col>
        </Row>

        <Row className="titulo">
          <p>
            Question:
            {' '}
            {questionsData[questionNumber].enunciado}
          </p>
        </Row>
        <Row className="titulo">
        {`${reportMensage}`}
        </Row>
        <Row>
          <Button onClick={() => checkIfCorrect(0)}>{questionsData[questionNumber].alternativas[0]}</Button>
          <Button onClick={() => checkIfCorrect(1)}>{questionsData[questionNumber].alternativas[1]}</Button>
        </Row>
        <Row className="bottonRow">
          <Button onClick={() => checkIfCorrect(2)}>{questionsData[questionNumber].alternativas[2]}</Button>
          <Button onClick={() => checkIfCorrect(3)}>{questionsData[questionNumber].alternativas[3]}</Button>
        </Row>
      </Col>
    </div>
  );
}
