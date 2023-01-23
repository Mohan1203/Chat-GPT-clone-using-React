const express = require("express");
const userRouter = require("./routes/userRoute");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());

app.use(userRouter);

app.listen(4000, () => {
    console.log("Server started on port 4000");
    }
);