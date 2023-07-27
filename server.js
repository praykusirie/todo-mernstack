const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const taskRoute = require('./routes/taskRoutes')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require("dotenv").config()
const path = require('path')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// middleware
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())


mongoose.connect(process.env.DATABASE, options)

app.use(taskRoute)


app.use(express.static(path.join(__dirname, "./client/dist")))

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/dist/index.html")
    )
})

// connecting with our mongodb database


//Listening when we are connected in our database and if not getting noticable error
mongoose.connection.on('open', () => {
    try {
        console.log('Connected to the mongodb')
        app.listen(process.env.PORT, () => console.log(`Server is runnign at port ${process.env.PORT}`))

    } catch (error) {
        console.log(error.message)
    }
})

