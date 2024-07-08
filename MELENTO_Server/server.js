const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const assessments_controller = require('./controller/assessments_controller');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/assessments', assessments_controller.getAssessments);
app.get('/assessments/:id', assessments_controller.getAssessmentById);
app.post('/addAssessment', assessments_controller.addAssessment);
app.put('/assessments/:id', assessments_controller.updateAssessment);
app.delete('/assessments/:id', assessments_controller.deleteAssessment);
