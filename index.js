const express = require("express");
const app = express();

const routes = require("./routers");
const dotenv = require("dotenv");
const { ConnectDB } = require("./DB/DBConnection");

dotenv.config();

const port = process.env.PORT || 3001;

app.set("port", port);
app.use(express.json());
app.use("/api/v1", routes);

const DB_URL =
  "mongodb+srv://admin:admin@cluster0.duw89bk.mongodb.net/?retryWrites=true&w=majority";

ConnectDB(DB_URL);

app.listen(app.get("port"), () => {
  console.log("Server Started", port);
});
