const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    unique: true
  },
  customer: String,
  description: String,
  pastdue: String,
  tags: Array,
  location: String,
  notes: Array,
}, {collection: "jobs"})

JobSchema.index({id: -1, urlTitle: 1})

module.exports = mongoose.model("Job", JobSchema)