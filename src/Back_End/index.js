const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const DB = require("./Controllers/db");

//cross-origin resource sharing :) 
const cors = require("cors");

//routes
const UsersRoutes = require("./Routes/users");
const PetsRoutes = require("./Routes/pets");
const AdminRoutes = require("../Back_End/Routes/admin");
const app = express();
const PORT = 5555;

//mongo
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://davita:6ujn9iUHkfopoMrG@cluster0.j6qur.mongodb.net/Pet_Project"
);

//settings section (app use is middleware)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); //returns a middleware function, allows body to be parsed
app.use(morgan("combined"));

app.use("/users", UsersRoutes);
app.use("/pets", PetsRoutes);
app.use("/admin", AdminRoutes);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message, errorType: err.type || "" });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
