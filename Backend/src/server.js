import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import notesRoutes from "./Routes/notesRoutes.js"
import { connectdb } from "./configs/db.js"

import rateLimiter from "./Middleware/ratelimiter.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());//middleware to use json parsing 
app.use(rateLimiter);//middleware to limit the rate of requests



// app.use((req,res,next)=>{
//     console.log(`Request method is ${req.method} & URL is ${req.url}`);
//     next();
// })



app.use("/api/notes", notesRoutes);

connectdb().then(() => {
    app.listen(5001, () => {
        console.log(`Server started at port: 5001`);
    });
});


