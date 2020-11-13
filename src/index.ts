import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import auth from "./routes/auth";
import dashboard from "./routes/dashboard";
import job from "./routes/job";
require("dotenv").config();

createConnection().then(() => {

    const PORT = (process.env.PORT + "" as any) | 4000
    const app = express();

    //Middlewares
    app.use(bodyParser.json());
    app.use(cors());

    //Routes
    app.use("/auth", auth);
    app.use("/dashboard", dashboard);
    app.use("/jobs", job);

    app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
}).catch(error => console.log(error));