const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require('./config/connectDb');
require("dotenv").config();

const {notFound, handleError} = require('./middlewares/errors')

const app = express();

// connect to database
connectDB();

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Opps no data we found here!" });
});

app.use('/auth', require('./routes/authRoute'));
app.use('/getUser', require('./routes/userRoute'));
app.use('/post', require('./routes/postRoute'));


// Error handler middleware
app.use(notFound);
app.use(handleError);

app.listen(process.env.PORT, () =>
  console.log(`http://localhost:${process.env.PORT}`)
);
