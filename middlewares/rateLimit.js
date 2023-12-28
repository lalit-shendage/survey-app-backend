const rateLimit = require('express-rate-limit');

const surveySubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 2, 
  message: 'Too many survey submissions from this IP. Please try again later.',
});

module.exports = surveySubmissionLimiter;
