import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import adminAuthRoutes from "./adminRoutes/auth";
import adminCourseRoutes from "./adminRoutes/course";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/adminauth", adminAuthRoutes);
app.use("/admincourse", adminCourseRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb://localhost:27017/LazyLearner', { dbName: "LazyLearner" });
