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
  billed: Boolean,
  tags: Array,
  location: String,
  notes: Array,
  jobtype: String,
  images: Array,
}, {collection: "jobs"})

JobSchema.index({id: -1})

module.exports = mongoose.model("Job", JobSchema)