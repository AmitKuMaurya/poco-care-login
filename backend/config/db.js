const mongoose = require("mongoose");
// const dotenv = require("dotenv")
// dotenv.config({path : "config/config.env"});
mongoose.set('strictQuery', false)
const connectDB = () =>{
mongoose.connect(process.env.MONGO_URL)
.then((data)=>{
    console.log(`MongoDB connected with server : ${data.connection.host}`);
}).catch((err)=>{
    console.log(err);
})
}
// console.log(process.env.MONGO_URL);

module.exports = {connectDB}

