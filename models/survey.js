const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['multiple-choice', 'text-input'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  options: [String], 
});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  responses: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      answers: [String], 
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Survey', surveySchema);
