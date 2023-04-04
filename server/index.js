import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  connect();
  console.log("Listening to port 8000");
});
