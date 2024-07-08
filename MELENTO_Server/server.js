const express = require("express");
const util = require("./util/util");
const cors = require("cors");
const bodyParser = require("body-parser");
const generic_controller = require("./controller/generic_controller");
const db_service = require("./services/db_service");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Define routes for each collection
const collections = [
  "assessments",
  "assessmentScore",
  "assessmentTrainees",
  "attendance",
  "cart",
  "coursecategories",
  "courses",
  "reports",
  "users",
];

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.staus(401).json({
          error : 'Bearer token invalid'
      });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error : 'Token verification failed'
        })
      }
      req.user = decoded ;
      next();
    });
  };

collections.forEach((collection) => {
  app.get(`/${collection}`, generic_controller.getDocuments(collection));
  app.get(`/${collection}/:id`,  generic_controller.getDocumentById(collection));
  app.post(`/${collection}`, generic_controller.addDocument(collection));
  app.put(`/${collection}/:id`, generic_controller.updateDocument(collection));
  app.delete(`/${collection}/:id`, generic_controller.deleteDocument(collection)
  );
});


// Login endpoint
app.post("/login", (req, res) => {
  const userDetails = req.body;
  const email = userDetails.email;
  const password = userDetails.password;
  generic_controller
    .getUserByCredentials("users", userDetails)
    .then((foundUser) => {
        
        const token =  jwt.sign(foundUser , process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            token : token
        })
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});


