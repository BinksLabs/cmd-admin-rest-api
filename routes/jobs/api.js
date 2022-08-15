const JobModel = require("../../models/job.js")
const moment = require("moment")

module.exports = {
    getAllJobs: function(callback) {
        const now = moment().unix()
      
        JobModel.find({pastdue: true}, "title id customer tags location pastdue")
        .sort({pastdue: -1})
        .exec(function(overdueJobsError, overdueJobs) {
          if (overdueJobsError) {
            callback({getDataError: true})
          } else {
            JobModel.find({pastdue: false}, "title id customer tags locationpastdue")
            .sort({pastdue: -1})
            .exec(function(paidupJobsError, paidupJobs) {
              if (paidupJobsError) {
                callback({getDataError: true})
              } else {
                callback({
                  success: true,
                  overdueJobs: overdueJobs,
                  paidupJobs: paidupJobs
                })
              }
            })
          }
        })
      }
}