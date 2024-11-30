import "express-async-errors";
import express from "express";
import connectDB from "./config/db.config";
import noteRouter from "./routes/note.routes";
import categoryRouter from "./routes/category.route";
import favoritesRouter from "./routes/favorites.route";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Note List using typescript</h1>");
});

// routes
app.use("/note", noteRouter);
app.use("/category", categoryRouter);
app.use("/favorites", favoritesRouter);

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Mongodb is connected!!!");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
// connecting to mongodb and starting the server
startDB();
