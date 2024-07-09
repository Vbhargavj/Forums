const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/AppError');

const userRouter = require("./Routers/UserRouter");
const forumRouter = require("./Routers/ForumRouter");
const tagRouter = require("./Routers/TagRouter");
const reviewRouter = require('./Routers/reviewRouter');
const uploadRoutes=require('./Routers/upload')
const globalErrorController = require("./Controllers/ErrorController");

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your client's URL
  credentials: true
};

app.use(cors(corsOptions));

// Middleware to log cookies
app.use((req, res, next) => {

  console.log('Cookies:', req.cookies);
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next(); // Pass control to the next middleware or route handler
});

app.use(morgan("dev"));

app.use('/', uploadRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/forum", forumRouter);
app.use("/api/v1/tag", tagRouter);
app.use("/api/v1/review", reviewRouter);
app.use(globalErrorController);
app.all("*", (req, res, next) => {
  return next(new AppError("page no found", 404));
});

module.exports = app;