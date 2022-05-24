const questionModel = require("../models/questions.model");

class Question {

    async getQuestions(req, res) {
        const { category, difficulty, quantity} = req.query;
        console.log(quantity)
        console.log(typeof(quantity))
        try {
            const questions = await questionModel.aggregate([
                {$match: {'category': category,'difficulty':difficulty}}, // filter the results
                {$sample: {size: parseInt(quantity)}} // You want to get 5 docs
            ]);
            res.send({ data: questions });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new Question();
