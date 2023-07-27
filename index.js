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
const PORT = process.env.PORT || 5000
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// middleware
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json({ extended: true }))




const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE, options)
        console.log('Connected to the mongodb')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

app.use(taskRoute)


app.use(express.static(path.join(__dirname, "./client/dist")))

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/dist/index.html"), (err) => {
            res.status(500).send(err)
        }
    )
})

// connecting with our mongodb database


//Listening when we are connected in our database and if not getting noticable error
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

