const assessmentsService = require('../services/asessment_service');
const util = require('../util/util');

function getAssessments(req, res) {
    assessmentsService.findAssessmentsAll().then(
        (items) => {
            const objArr = items;
            objArr.forEach((obj) => {
                util.renamekey(obj, "_id", "id");
            });
            res.setHeader('Content-Type', 'application/json');
            res.json(objArr);
        }
    ).catch((error) => {
        res.status(500).json({ message: "Could not get assessments", error });
    });
}

function getAssessmentById(req, res) {
    const id = req.params.id;
    assessmentsService.findAssessmentById(id).then(
        (item) => {
            util.renamekey(item, "_id", "id");
            res.setHeader('Content-Type', 'application/json');
            res.json(item);
        }
    ).catch((error) => {
        res.status(404).json({ message: "Assessment not found", error });
    });
}

function addAssessment(req, res) {
    const newAssessment = req.body;
    assessmentsService.addAssessment(newAssessment).then(
        (result) => {
            res.status(201).json(result);
        }
    ).catch((error) => {
        res.status(500).json({ message: "Could not add assessment", error });
    });
}

function updateAssessment(req, res) {
    const id = req.params.id;
    const updatedAssessment = req.body;
    assessmentsService.updateAssessment(id, updatedAssessment).then(
        (result) => {
            res.json(result);
        }
    ).catch((error) => {
        res.status(404).json({ message: "Assessment not found", error });
    });
}

function deleteAssessment(req, res) {
    const id = req.params.id;
    assessmentsService.deleteAssessment(id).then(
        () => {
            res.json({ message: "Assessment deleted" });
        }
    ).catch((error) => {
        res.status(404).json({ message: "Assessment not found", error });
    });
}

module.exports = {
    getAssessments,
    getAssessmentById,
    addAssessment,
    updateAssessment,
    deleteAssessment
};
