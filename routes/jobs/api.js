const JobModel = require("../../models/job.js")

const randomstring = require(("randomstring"))

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
  },
  getJobById: function(id, callback) {
    if(getDataError) {
      callback({getDataError:true})
    } else {
      callback({success: true, job: job})
    }
  },
  createNewJob: function(title, customer, description, billed, tags, location, notes, images, jobtype, callback) {
    JobModel.findOne({$or: [{title: title}, {customer: customer}]}).exec(function(error, job) {
      if (error) {
        callback({submitError: true})
      } else if (job) {
        callback({alreadyExistsError: true})
      } else {
        const arrayOfTags = tags.split(",").map(function(tag){
          return tag.trim()
        })
        const arrayOfNotes = notes.split(",").map(function(note){
          return note.trim()
        })
      

      const newJob = new JobModel({
        id:randomstring.generate(12),
        title: title,
        customer: customer,
        description: description,
        billed: billed,
        tags: arrayOfTags,
        location: location,
        notes: arrayOfNotes,
        jobtype: jobtype,
        images: images
      })

      newJob.save(function(error) {
        if(saveError) {
          callback({submitError: true})
        } else {
          callback({success:true})
        }
      })
      }
    })
  }


      
}