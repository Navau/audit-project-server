const express = require("express");
const causeController = require("../controllers/causes.controllers");

const api = express.Router();

api.post("/add-cause", causeController.addCause);
api.get("/get-causes", causeController.getCauses);
api.put("/update-cause/:id", causeController.updateCause);
api.delete("/delete-cause/:id", causeController.deleteCause);
api.get("/get-cause/:id", causeController.getCause);

module.exports = api;
