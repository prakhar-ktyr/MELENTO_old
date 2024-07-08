const db_service = require('../services/db_service');
const util = require('../util/util');

module.exports = {
    getDocuments,
    getDocumentById,
    addDocument,
    updateDocument,
    deleteDocument
};

function getDocuments(collectionName) {
    return (req, res) => {
        db_service.findAll(collectionName).then(
            (items) => {
                const objArr = items;
                objArr.forEach((obj) => {
                    util.renamekey(obj, "_id", "id");
                });
                const updatedItems = JSON.stringify(objArr);
                res.setHeader('Content-Type', 'application/json');
                res.send(updatedItems);
            },
            (err) => {
                res.status(500).json({ message: err.message });
            }
        ).catch((error) => {
            res.status(500).json({ message: error.message });
        });
    };
}

function getDocumentById(collectionName) {
    return (req, res) => {
        db_service.findById(collectionName, req.params.id).then(
            (item) => {
                if (item) {
                    util.renamekey(item, "_id", "id");
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(item));
                } else {
                    res.status(404).json({ message: 'Document not found' });
                }
            },
            (err) => {
                res.status(500).json({ message: err.message });
            }
        ).catch((error) => {
            res.status(500).json({ message: error.message });
        });
    };
}

function addDocument(collectionName) {
    return (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        db_service.addDocument(collectionName, req.body).then(
            (result) => {
                res.send(result);
            },
            (err) => {
                res.status(500).json({ message: err.message });
            }
        ).catch((error) => {
            res.status(500).json({ message: error.message });
        });
    };
}

function updateDocument(collectionName) {
    return (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        db_service.updateDocument(collectionName, req.params.id, req.body).then(
            (result) => {
                if (result) {
                    res.send(result);
                } else {
                    res.status(404).json({ message: 'Document not found' });
                }
            },
            (err) => {
                res.status(500).json({ message: err.message });
            }
        ).catch((error) => {
            res.status(500).json({ message: error.message });
        });
    };
}

function deleteDocument(collectionName) {
    return (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        db_service.deleteDocument(collectionName, req.params.id).then(
            (result) => {
                if (result) {
                    res.json({ message: 'Document deleted' });
                } else {
                    res.status(404).json({ message: 'Document not found' });
                }
            },
            (err) => {
                res.status(500).json({ message: err.message });
            }
        ).catch((error) => {
            res.status(500).json({ message: error.message });
        });
    };
}
