const app = require("./app")
const dotenv = require("dotenv");
const cloudinary = require("cloudinary")
const {connectDB} = require("./config/db")

// config
dotenv.config({path : "./config/config.env"});

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});
// console.log(process.env.FRONTEND_URL);

app.listen(process.env.PORT,async()=>{
    // connnecting to db 
    try{
        await connectDB();
        console.log(`server is Listening on http://localhost:${process.env.PORT}`)
    } catch(err){
        console.log(err,{ err_msg : "Error occured"})
    }
})