const {connectDB} = require("./db/connect.js")
const express = require("express")
require("dotenv").config()
const app = express()
const cors = require('cors');

const tasks = require("./routes/tasks.js")

const port = 3000
//middleware to handle POST requests
app.use(cors())
app.use(express.json())
app.use("/api/v1/tasks", tasks)
app.use(express.static('../frontend/public'))


const PORT = 8080

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`server listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()