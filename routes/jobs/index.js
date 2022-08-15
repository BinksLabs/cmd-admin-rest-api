const express = require("express")

const api = require("./api.js")

const authAdminUser = require("../../middlewares/index.js").authAdminUser

const app = express.Router()

app.get("/jobs/get-all", authAdminUser, function(req, res) {
    if (!res.locals.authSuccess) {
      res.json({authSuccess: false})
    } else {
      api.getAllJobs(function(apiResponse) {
        apiResponse.authSuccess = true
        res.json(apiResponse)
      })
    }
  })

module.exports = app