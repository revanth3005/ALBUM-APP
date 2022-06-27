const express = require("express")
const http = require("http")
const createError = require("http-errors")
const mongoose = require("mongoose")
const helmet=require("helmet")
const cors = require("cors")

const app=express()
const server=http.createServer(app)
const PORT=process.env.PORT || 3001

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(helmet.hidePoweredBy())
app.use(helmet.crossOriginEmbedderPolicy())

//importing user- routes 
const user_router=require("./routes/user.route")
app.use("/",user_router)

//login router
const login_router=require("./routes/login.route")
app.use("/",login_router)

//album routes
const album_router=require("./routes/album.route")
app.use("/",album_router)


// connecting mongo-server
const url="mongodb+srv://ujwala:revanth@cluster0.8vi7r.mongodb.net/?retryWrites=true&w=majority"
//const url="mongodb://localhost:27017/ALBUM_MANAGEMENT"
mongoose.connect(url).then((res)=>console.log(`MongoDb server is connected to DB Succesfully running on ${url}`))
.catch((error)=>console.error(`Server is not connected ${error}`))


// connectin express-server
server.listen(PORT, () => {
    console.log(`Express Server is runnin on http://localhost:${PORT}`);
})