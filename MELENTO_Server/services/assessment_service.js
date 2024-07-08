const util = require('../util/util');

// Helper function to add an object to the collection
async function addObject(collection, object) {
    return new Promise((resolve, reject) => {
        collection.insertOne(object, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Object added");
                resolve(result);
            }
        });
    });
}

// Find all assessments
async function findAssessmentsAll() {
    console.log("findAssessmentsAll");
    return new Promise(async (resolve, reject) => {
        try {
            const coll = await util.connect("assessments");
            const items = await coll.find().toArray();
            console.log(items);
            resolve(items);
        } catch (err) {
            reject(err);
        }
    });
}

// Find assessment by ID
async function findAssessmentById(id) {
    console.log("findAssessmentById");
    return new Promise(async (resolve, reject) => {
        try {
            const coll = await util.connect("assessments");
            const item = await coll.findOne({ _id: id });
            console.log(item);
            resolve(item);
        } catch (err) {
            reject(err);
        }
    });
}

// Add a new assessment
async function addAssessment(id, assessmentName, assessmentDescription, assessmentImage, questions, price, facultyId, time, isActive) {
    return new Promise(async (resolve, reject) => {
        try {
            const coll = await util.connect("assessments");
            const result = await addObject(coll, {
                _id: id,
                assessmentName: assessmentName,
                assessmentDescription: assessmentDescription,
                assessmentImage: assessmentImage,
                questions: questions,
                price: price,
                facultyId: facultyId,
                time: time,
                isActive: isActive
            });
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
}

// Update an assessment
async function updateAssessment(id, updatedAssessment) {
    return new Promise(async (resolve, reject) => {
        try {
            const coll = await util.connect("assessments");
            const result = await coll.updateOne({ _id: id }, { $set: updatedAssessment });
            if (result.matchedCount > 0) {
                console.log("Assessment updated");
                resolve(result);
            } else {
                resolve(null);
            }
        } catch (err) {
            reject(err);
        }
    });
}

// Delete an assessment
async function deleteAssessment(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const coll = await util.connect("assessments");
            const result = await coll.deleteOne({ _id: id });
            if (result.deletedCount > 0) {
                console.log("Assessment deleted");
                resolve(result);
            } else {
                resolve(null);
            }
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    findAssessmentsAll,
    findAssessmentById,
    addAssessment,
    updateAssessment,
    deleteAssessment
};
