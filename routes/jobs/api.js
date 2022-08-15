const JobModel = require("../../models/job.js")
const moment = require("moment")

module.exports = {
  getAllJobs: function(callback) {
    const now = moment().unix()

    JobModel.find({billed: true, billed: false}, "title id customer tags location billed")
    .exec(function(error, jobs) {
      if (error) {
        callback({getDataError: true})
      } else {
        callback({success: true, jobs: jobs})
      }
    })
  }

      
}