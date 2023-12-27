const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');

// Create survey

exports.createSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const userId = req.user.id; 

    const survey = new Survey({ title, questions, createdBy: userId });
    await survey.save();

    const surveyID = `${survey._id}`;
    
    res.json({ surveyID });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Get survey by ID
exports.getSurveyById = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ msg: 'Survey not found' });
    }

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Submit response to a survey
exports.submitResponse = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { answers } = req.body;
    console.log(surveyId, answers)

    const survey = await Survey.findById(surveyId);
    console.log(surveyId)
    if (!survey) {
      
      return res.status(404).json({ msg: 'Survey not found' });
    }

    // Save the user's response
    survey.responses.push({ answers });
    await survey.save();

    res.json({ msg: 'Response submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();

    res.status(200).json({ surveys });
  } catch (error) {
    console.error('Error fetching surveys:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

