const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    "category" : String, 
    "difficulty" : String, 
    "question": String,
    "correct_answer": String,
    "incorrect_answers": []
},{collection : 'questions'}
);

const UserModel = mongoose.model('question', QuestionSchema);

module.exports = UserModel;
