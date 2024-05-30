const express = require("express");
const app = express();
const morgan = require("morgan");

const tourRouter = require("./Routes/tours");
const userRouter = require("./Routes/users");


//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

//ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports=app;

