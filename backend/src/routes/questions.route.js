const express = require('express');

const QuestionController = require("../controllers/questions.controller");

const Routes = express.Router();

Routes.get("/api/questions", QuestionController.getQuestions);

module.exports = Routes;