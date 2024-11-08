const express = require("express")
const { dbConnection } = require("./dbConnection");
const { userRouter } = require("./routes/userRouter");
const { accountRouter } = require("./routes/accountRouter");
const cors = require('cors')
const app = express()
const PORT = 3000;
require('dotenv').config();

app.use(express.json());
app.use(cors());


dbConnection();

app.use("/api/v1/user",userRouter);
app.use("/api/v1/account",accountRouter)

app.use((err,req,res,next)=>{
    return res.status(500).json({messege:"somthing broke at the back!"})
})
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
});