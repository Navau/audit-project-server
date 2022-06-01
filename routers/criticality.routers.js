const express = require("express");
const criticalityController = require("../controllers/criticality.controllers");

const api = express.Router();

api.post("/add-criticality", criticalityController.addCriticality);
api.get("/get-criticalitys", criticalityController.getCriticalitys);
api.put("/update-criticality/:id", criticalityController.updateCriticality);
api.delete("/delete-criticality/:id", criticalityController.deleteCriticality);
api.get("/get-criticality/:id", criticalityController.getCriticality);

module.exports = api;
