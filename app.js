const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./Controllers/errorController");

const tourRouter = require("./Routes/tours");
const userRouter = require("./Routes/users");

//MIDDLEWARES
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.static("public"));

//ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
