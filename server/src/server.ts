import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import adminAuthRoutes from "./routes/authRoutes.admin";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
//initializing app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieparser());
dotenv.config();

//initializing mongoose

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mernecommerce.bhuqo.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("monogoDB is connected");
  })
  .catch((err) => console.log(err));

//routes
app.get("/", (req, res) => {
  res.json({ message: "hello this is a test page" });
});

app.use("/api/auth", authRoutes);
app.use("/api/auth_admin", adminAuthRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
//PORT
app.listen(process.env.PORT, () => {
  console.log(`listening port : ${process.env.PORT}`);
});
