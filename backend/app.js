const express = require("express"); 
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const { errMiddleware } = require("./middlewares/error");

dotenv.config({path : "./config/config.env"})


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors());

app.get("/",(req,res)=>{
  res.send(`This is Hosted website : ${process.env.FRONTEND_URL}`)
})

app.use(express.static(process.env.STATIC_DIR));

const {userRouter} = require("./routes/user.route");

app.use("/api/v1",userRouter);

app.use(errMiddleware);

module.exports = app;