const express = require("express")

const api = require("./api.js")

const authAdminUser = require("../../middlewares/index.js").authAdminUser

const app = express.Router()

app.get("/jobs/get-all", authAdminUser, function(req, res) {
    if (!res.locals.authSuccess) {
      api.getAllJobs(function(apiResponse) {
        apiResponse.authSuccess = true
        res.json(apiResponse)
      })
    } else {
      api.getAllJobs(function(apiResponse) {
        apiResponse.authSuccess = true
        res.json(apiResponse)
      })
    }
  })

app.post("/jobs/create-new", authAdminUser, function(req, res) {
  if (
    !req.body.title ||
    !req.body.customer ||
    !req.body.description ||
    !req.body.billed ||
    !req.body.tags ||
    !req.body.location ||
    !req.body.notes ||
    !req.body.jobtype
  ) {
    res.json({submitError: false})
  } else if (!res.locals.authSuccess) {
    res.json({authSuccess: false})
  } else {
    api.createNewBlogPost(
      req.body.title,
      req.body.customer,
      req.body.description,
      req.body.billed,
      req.body.tags,
      req.body.location,
      req.body.notes,
      req.body.jobtype,
      function(apiResponse) {
        apiResponse.authSuccess = true
        res.json(apiResponse)
      }
    )
  }
})
module.exports = app