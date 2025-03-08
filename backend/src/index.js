import express from "express";
import authRoutes from "./routes/auth.route.js";
 // Correct extension is used in local 
 import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import messageRoutes from "./routes/message.route.js";

import path from "path";




dotenv.config() // function To access the environment variable 
const PORT = process.env.PORT;
//THIS  GONA READ FRON THE DATABASE
const __dirname = path.resolve();


// const app = express(); // now no use as we have created one in Socket IO
// What it does: Creates an instance of an Express application and assigns it to the variable app.
// Why it’s needed: This app object is used to define routes, middleware, and other server logic.


// Define a base test route
// app.get("/", (req, res) => {
//     res.send("Server is running on the base route!");
// });



app.use(express.json()); // using to extract Data out of body , before defining your router
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRoutes);
// What it does: Mounts the authRoutes module on the /api/auth path. All routes defined in auth.route.js will now be accessible with the /api/auth prefix.
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }





// Start the server
server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB() // Establishes the MongoDB connection when the app starts
});
