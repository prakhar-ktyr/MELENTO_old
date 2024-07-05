const util = require('../util/util');
const assessments_service = require('../services/asessment_service');

function getAssessments(req, res) {
    assessments_service.findAssessmentsAll().then(
        (items) => {
            console.log("Promise fulfilled")
            console.log(items);
            const objArr = items;
            objArr.forEach((obj) => {
                util.renamekey(obj, "_id", "id");
            });
            const updateItems = JSON.stringify(objArr);
            console.log(updateItems);
            res.setHeader('Content-Type', 'application/json');
            res.send(updateItems);

        },
        (err) => {
            console.error("Promise ocurred");

        }
    ).catch((error) => {
        console.error("Could not get products: ", error);
    });;  //.catch not required, if error comes both will be shown
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
            console.error("Promise ocurred");
        }
    ).catch((error) => {
        console.error("Could not add product: ", error);
    });;
}

module.exports = {
    getAssessments,
    addAssessment
};