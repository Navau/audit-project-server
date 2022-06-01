const express = require("express");
const incidentController = require("../controllers/incidentClassification.controllers");

const api = express.Router();

api.post("/add-incident", incidentController.addIncident);
api.get("/get-incidents", incidentController.getIncidents);
api.put("/update-incident/:id", incidentController.updateIncident);
api.delete("/delete-incident/:id", incidentController.deleteIncident);
api.get("/get-incident/:id", incidentController.getIncident);

module.exports = api;
