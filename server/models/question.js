const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    category: { type: String},
    answer: { type: String },
    aaa: 111,
    abc: 126,

});

module.exports = mongoose.model('Question', QuestionSchema);