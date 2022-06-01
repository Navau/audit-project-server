const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const CausesSchema = Schema({
  typeIncident: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  causesOcurrence: {
    type: Object,
    required: true,
  },
  date: Date,
});

CausesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Causes", CausesSchema);
