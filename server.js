const express=require("express");

const app=express();

app.use(express.json());

const employeeRoute=require("./routes/employeeRoutes");

app.use("/employees",employeeRoute);

app.listen(5000,()=>{
    console.log("Server Running on Port 5000")
});