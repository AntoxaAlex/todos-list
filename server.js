const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const Todos = require("./models/todos")

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const port = process.env.PORT || 4000;
const dburl = process.env.DBURL

//Middleware
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(cors());

//Connect to db
const dbConnect = async ()=>{
    try {
        await mongoose.connect(dburl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Database has been successfully connected")
    }catch (e) {
        console.log('DB did not connected: ' + e.message);
        //Exit process with failure
        process.exit(1);
    }
}

//Routes
app.get("/api/todos/:id", async (req,res)=>{
    try{
        const todolist =await Todos.findById(req.params.id);
        res.json(todolist)
    }catch (e) {
        console.log(e.message);
        res.status(500)
    }
})
app.put("/api/todos/:id",async (req,res)=>{
    try {
        let todolist = await Todos.findByIdAndUpdate(req.params.id, req.body, {new: true});
        await todolist.save()
        res.json(todolist)
    }catch (e) {
        console.log(e.message);
        res.status(500);
    }
})

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static("client/build"));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"client", "build", "index.html"))
    })
}

app.listen(port,()=>{
    console.log("Server running...")
    dbConnect();
})