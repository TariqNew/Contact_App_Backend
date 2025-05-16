const express= require("express")
const dotenv = require("dotenv").config()

const PORT=process.env.PORT || 8080

const app = express()

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})