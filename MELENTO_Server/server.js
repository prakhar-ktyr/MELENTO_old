const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const generic_controller = require('./controller/generic_controller');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Define routes for each collection
const collections = ['assessments', 'assessmentScore', 'assessmentTrainees', 'attendance', 'cart', 'coursecategories', 'courses', 'reports', 'users'];

collections.forEach(collection => {
    app.get(`/${collection}`, generic_controller.getDocuments(collection));
    app.get(`/${collection}/:id`, generic_controller.getDocumentById(collection));
    app.post(`/${collection}`, generic_controller.addDocument(collection));
    app.put(`/${collection}/:id`, generic_controller.updateDocument(collection));
    app.delete(`/${collection}/:id`, generic_controller.deleteDocument(collection));
});
