const JobModel = require("../../models/job.js")
const moment = require("moment")

module.exports = {
  getAllJobs: function(callback) {

    JobModel.find({}, "title id customer tags location billed images")
    .exec(function(getDataError, allJobs) {
      if (getDataError) {
        callback({getDataError: true})
      } else {
        callback({success: true, allJobs: allJobs})
      }
    })
  }

      
}