const util = require('../util/util');

async function addObject(collection, object) {
    return new Promise((resolve, reject) => {
        collection.insertOne(object, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.ops[0]);
            }
        });
    });
}

async function findAssessmentsAll() {
    const coll = await util.connect("assessments");
    return coll.find().toArray();
}

async function findAssessmentById(id) {
    const coll = await util.connect("assessments");
    return coll.findOne({ _id: id });
}

async function addAssessment(assessment) {
    const coll = await util.connect("assessments");
    return addObject(coll, assessment);
}

async function updateAssessment(id, updatedAssessment) {
    const coll = await util.connect("assessments");
    const result = await coll.updateOne({ _id: id }, { $set: updatedAssessment });
    if (result.matchedCount > 0) {
        return updatedAssessment;
    } else {
        throw new Error('Assessment not found');
    }
}

async function deleteAssessment(id) {
    const coll = await util.connect("assessments");
    const result = await coll.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
        return true;
    } else {
        throw new Error('Assessment not found');
    }
}

module.exports = {
    findAssessmentsAll,
    findAssessmentById,
    addAssessment,
    updateAssessment,
    deleteAssessment
};
