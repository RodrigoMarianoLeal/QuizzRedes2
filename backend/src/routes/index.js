const express = require('express');

const UserRouter = require('./user.route');
const QuestionRouter = require('./questions.route');
const Routes = express.Router();
Routes.use('', QuestionRouter);
Routes.use('', UserRouter);

module.exports = Routes;
