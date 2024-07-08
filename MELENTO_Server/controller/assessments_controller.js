const assessments_service = require('../services/assessment_service');
const util = require('../util/util');

module.exports = {
    getAssessments,
    getAssessmentById,
    addAssessment,
    updateAssessment,
    deleteAssessment
};

function getAssessments(req, res) {
    assessments_service.findAssessmentsAll().then(
        (items) => {
            console.log("Promise fulfilled");
            const objArr = items;
            objArr.forEach((obj) => {
                util.renamekey(obj, "_id", "id");
            });
            const updatedItems = JSON.stringify(objArr);
            res.setHeader('Content-Type', 'application/json');
            res.send(updatedItems);
        },
        (err) => {
            console.error("Promise failed");
            res.status(500).json({ message: err.message });
        }
    ).catch((error) => {
        console.error("Could not get assessments: ", error);
        res.status(500).json({ message: error.message });
    });
}

function getAssessmentById(req, res) {
    assessments_service.findAssessmentById(req.params.id).then(
        (item) => {
            if (item) {
                util.renamekey(item, "_id", "id");
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(item));
            } else {
                res.status(404).json({ message: 'Assessment not found' });
            }
        },
        (err) => {
            console.error("Promise failed");
            res.status(500).json({ message: err.message });
        }
    ).catch((error) => {
        console.error("Could not get assessment: ", error);
        res.status(500).json({ message: error.message });
    });
}

function addAssessment(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("method called");
    console.log(req.body);
    var id = req.body.id;
    var assessmentName = req.body.assessmentName;
    var assessmentDescription = req.body.assessmentDescription;
    var assessmentImage = req.body.assessmentImage;
    var questions = req.body.questions;
    var price = req.body.price;
    var facultyId = req.body.facultyId;
    var time = req.body.time;
    var isActive = req.body.isActive;
    assessments_service.addAssessment(id, assessmentName, assessmentDescription, assessmentImage, questions, price, facultyId, time, isActive).then(
        (result) => {
            console.log("Promise fulfilled");
            res.send(result);
        },
        (err) => {
            console.error("Promise failed");
            res.status(500).json({ message: err.message });
        }
    ).catch((error) => {
        console.error("Could not add assessment: ", error);
        res.status(500).json({ message: error.message });
    });
}

function updateAssessment(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("method called");
    console.log(req.body);
    assessments_service.updateAssessment(req.params.id, req.body).then(
        (result) => {
            if (result) {
                console.log("Promise fulfilled");
                res.send(result);
            } else {
                res.status(404).json({ message: 'Assessment not found' });
            }
        },
        (err) => {
            console.error("Promise failed");
            res.status(500).json({ message: err.message });
        }
    ).catch((error) => {
        console.error("Could not update assessment: ", error);
        res.status(500).json({ message: error.message });
    });
}

function deleteAssessment(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("method called");
    assessments_service.deleteAssessment(req.params.id).then(
        (result) => {
            if (result) {
                console.log("Promise fulfilled");
                res.json({ message: 'Assessment deleted' });
            } else {
                res.status(404).json({ message: 'Assessment not found' });
            }
        },
        (err) => {
            console.error("Promise failed");
            res.status(500).json({ message: err.message });
        }
    ).catch((error) => {
        console.error("Could not delete assessment: ", error);
        res.status(500).json({ message: error.message });
    });
}
