const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const surveyController = require('../controllers/surveyController');
const surveySubmissionLimiter = require('../middlewares/rateLimit');

// Create survey (requires authentication)
router.post('/create', authenticate, surveyController.createSurvey);

// Get survey by ID
router.get('/:id', surveyController.getSurveyById);

router.get('/', surveyController.getAllSurveys);

// Submit response to a survey
router.post('/submit/:id',surveySubmissionLimiter, surveyController.submitResponse);


module.exports = router;
