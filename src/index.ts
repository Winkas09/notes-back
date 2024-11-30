import "express-async-errors";
import express from "express";
import connectDB from "./config/db.config";
import noteRouter from "./routes/note.routes";
import categoryRouter from "./routes/category.route";
import favoritesRouter from "./routes/favorites.route";
require("dotenv").config();

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Note List using typescript</h1>");
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
}));

// routes
app.use("/api/note", noteRouter);
app.use("/api/category", categoryRouter);
app.use("/api/favorites", favoritesRouter);

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
