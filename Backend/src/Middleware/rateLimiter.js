import ratelimit from "../configs/upstash.js";


const rateLimiter = async (req, res, next) =>{
    try {
        const {success} = await ratelimit.limit("my-key-for-rate-limit");
        if(!success){
            res.status(429).json({
                message:"Too many requests. Please try again later"
                
            });
            return;
        }
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;