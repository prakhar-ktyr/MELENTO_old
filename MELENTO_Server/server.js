const express = require('express');
const assessmentsController = require('./controller/assessments_controller');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = 3000;

app.listen(port, () => 
    console.log(`Server running on port ${port}`)
);

app.get('/assessments', assessmentsController.getAssessments);
app.get('/assessments/:id', assessmentsController.getAssessmentById);
app.post('/addAssessment', assessmentsController.addAssessment);
app.put('/assessments/:id', assessmentsController.updateAssessment);
app.delete('/assessments/:id', assessmentsController.deleteAssessment);
