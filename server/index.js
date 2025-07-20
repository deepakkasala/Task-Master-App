const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

dotenv.config();
const app = express();

// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

PORT = process.env.PORT || 3030;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB.");
    app.listen(PORT, "0.0.0.0", (req, res) => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
