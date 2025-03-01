const express = require('express');
const routes = express.Router();
const { createContribute, updateContribute, deleteContribute, fetchContributions } = require('../controllers/contributeController');

routes.post("/createContribute", createContribute);
routes.post("/update-contribution/:userId", updateContribute);
routes.post("/delete-contribution/:userId", deleteContribute);
routes.get("/fetchContributions", fetchContributions);

module.exports = routes;