import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import notesRoutes from "./Routes/notesRoutes.js"
import { connectdb } from "./configs/db.js"
import path from "path"
import rateLimiter from "./Middleware/ratelimiter.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

if(process.env.NODE_ENV ==="production"){

    app.use(cors({
        origin: "http://localhost:5173"
    }));
}
    app.use(express.json());//middleware to use json parsing 
    app.use(rateLimiter);//middleware to limit the rate of requests



// app.use((req,res,next)=>{
//     console.log(`Request method is ${req.method} & URL is ${req.url}`);
//     next();
// })



app.use("/api/notes", notesRoutes);



if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}

connectdb().then(() => {
    app.listen(5001, () => {
        console.log(`Server started at port: 5001`);
    });
});


