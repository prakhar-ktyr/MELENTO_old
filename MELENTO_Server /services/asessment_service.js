var util = require('../util/util');

function addObject(collection, object) {
    collection.insertOne(object, function (err, result) {
        if (!err) {
            console.log("Object added");
            console.log(result);
        }
    });
}

var findAssessmentsAll = function () {
    console.log("findAssessmentsAll");
    return new Promise(async (resolve, reject) => {
        var coll = util.connect("assessments");
        var items = coll.find().toArray();
        console.log(items);
        resolve(items);
    });
}

function addAssessment(id, assessmentName, assessmentDescription, assessmentImage, questions, price, facultyId, time, isActive) {
    return new Promise((resolve, reject) => {
        var coll = util.connect("assessments");
        resolve(addObject(coll, {
            id: id,
            assessmentName: assessmentName,
            assessmentDescription: assessmentDescription,
            assessmentImage: assessmentImage,
            questions: questions,
            price: price,
            facultyId: facultyId,
            time: time,
            isActive: isActive
        }))
    });
}

module.exports = {
    findAssessmentsAll,
    addAssessment
};
