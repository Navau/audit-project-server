const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const CriticalitySchema = Schema({
  level: {
    type: Number,
    required: true,
  },
  classification: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  equivalence: {
    type: String,
    required: true,
  },
  date: Date,
});

CriticalitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Criticality", CriticalitySchema);
