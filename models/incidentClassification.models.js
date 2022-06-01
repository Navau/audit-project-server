const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const IncidentClassificationSchema = Schema({
  _incidenteClassification: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  idCauseType: {
    type: String,
    unique: true,
    required: true,
  },
  idCriticality: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: Date,
});

IncidentClassificationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model(
  "IncidentClassification",
  IncidentClassificationSchema
);
