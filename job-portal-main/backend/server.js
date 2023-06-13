const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");

// MongoDB
mongoose
  .connect(
    "mongodb+srv://gojo:Gojo_jj@job.dfq95zl.mongodb.net/jobPortal?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

// const test1 = () => {
//   return "reolsce";
// };

// const testPromise = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("resolve");
//     }, 3000);
//   });
// };

// (async () => {
//   const res = await testPromise();
//   console.log(res);
// })();
// testPromise()
//   .then((res) => console.log("res", res))
//   .catch((err) => console.log("err", err));
