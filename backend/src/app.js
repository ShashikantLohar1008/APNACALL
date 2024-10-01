import express from "express";
import {createServer}from "node:http";



import mongoose from "mongoose";
import connectToSocket from "../src/controllers/socketManger.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js"


const app=express();
const server=createServer(app);
// const io=new Server(server);
const io=connectToSocket(server);

app.set("port",8000);


// app.get("/home",(req,res)=>{
//     return res.json({"hello":"World"});
// });

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);


const start = async () => {
    try {
        // Correct connection string, including options in the URI
        const connectionDb = await mongoose.connect("mongodb://127.0.0.1:27017/APNAVIDEOCALL?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2");

        console.log(`Connected to database ${connectionDb.connection.host}`);

        // Start the server after successful database connection
        server.listen(app.get("port"), () => {
            console.log(`Listening on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

start();