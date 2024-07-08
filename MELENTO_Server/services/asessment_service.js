var util = require('../util/util');

// Helper function to add an object to the collection
function addObject(collection, object) {
    return new Promise((resolve, reject) => {
        collection.insertOne(object, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Object added");
                console.log(result);
                resolve(result);
            }
        });
    });
}

// Find all assessments
var findAssessmentsAll = function () {
    console.log("findAssessmentsAll");
    return new Promise(async (resolve, reject) => {
        var coll = await util.connect("assessments");
        coll.find().toArray(function (err, items) {
            if (err) {
                reject(err);
            } else {
                console.log(items);
                resolve(items);
            }
        });
    });
}

// Find assessment by ID
var findAssessmentById = function (id) {
    console.log("findAssessmentById");
    return new Promise(async (resolve, reject) => {
        var coll = await util.connect("assessments");
        coll.findOne({ _id: id }, function (err, item) {
            if (err) {
                reject(err);
            } else {
                console.log(item);
                resolve(item);
            }
        });
    });
}

// Add a new assessment
function addAssessment(id, assessmentName, assessmentDescription, assessmentImage, questions, price, facultyId, time, isActive) {
    return new Promise(async (resolve, reject) => {
        var coll = await util.connect("assessments");
        resolve(addObject(coll, {
            _id: id,
            assessmentName: assessmentName,
            assessmentDescription: assessmentDescription,
            assessmentImage: assessmentImage,
            questions: questions,
            price: price,
            facultyId: facultyId,
            time: time,
            isActive: isActive
        }));
    });
}

// Update an assessment
function updateAssessment(id, updatedAssessment) {
    return new Promise(async (resolve, reject) => {
        var coll = await util.connect("assessments");
        coll.updateOne({ _id: id }, { $set: updatedAssessment }, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Assessment updated");
                console.log(result);
                resolve(result);
            }
        });
    });
}

// Delete an assessment
function deleteAssessment(id) {
    return new Promise(async (resolve, reject) => {
        var coll = await util.connect("assessments");
        coll.deleteOne({ _id: id }, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Assessment deleted");
                console.log(result);
                resolve(result);
            }
        });
    });
}

module.exports = {
    findAssessmentsAll,
    findAssessmentById,
    addAssessment,
    updateAssessment,
    deleteAssessment
};
