const express = require("express");
const app = express();
const connectDb = require("./config/database");
const dotenv = require("dotenv");
const { privateRouter } = require("./routes/private");
const { companyRouter } = require("./routes/company");
const cors = require("cors");

dotenv.config();
app.use(express.json());

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

app.use("/", privateRouter);
app.use("/", companyRouter);

connectDb()
  .then(() => {
    console.log("successfully connect to database");
    app.listen(process.env.PORT, () => {
      console.log("server successfully run on port 9876");
    });
  })
  .catch(() => {
    console.log("error in connecting to database");
  });
