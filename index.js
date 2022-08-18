const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")

const config = require("./config.js")

dotenv.config()

const PORT = process.env.PORT || 5001

const app = express()

const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@jobtracker.bbws73o.mongodb.net/jobtracker?retryWrites=true&w=majority`

mongoose.connect(mongoString)

mongoose.connection.on("error", function(err) {
  if (process.env.NODE_ENV === "development") {
    console.log(err)
  }
})

mongoose.connection.on("open", function() {
  if (process.env.NODE_ENV === "development") {
    console.log("Connected to database.")
  }
})

app.use(helmet())
const corsOptions ={
    origin:'http://localhost:3001',
  credentials: true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }))

app.use(cookieParser())
app.use(require("./routes/admin-user/index.js"))
app.use(require("./routes/jobs/index.js"))
app.use("/assets", express.static(path.join(__dirname, "..", "..", "assets")))


app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})
