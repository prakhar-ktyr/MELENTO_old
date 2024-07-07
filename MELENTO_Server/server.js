const assessments_controller = require('./controller/assessments_controller');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
const server = app.listen(port, () => 
    console.log(`Server running on port ${port}`)
);

app.get('/assessments', (req, res) => {
    assessments_controller.getAssessments(req, res);
});

app.post('/addAssessment', (req, res) => {
    assessments_controller.addAssessment(req, res);
});