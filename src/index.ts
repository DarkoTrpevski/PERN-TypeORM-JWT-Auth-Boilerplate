import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import auth from "./routers/auth";
require("dotenv").config();

createConnection().then(() => {

    const PORT = (process.env.PORT + "" as any) | 4000
    // create express app
    const app = express();
    app.use(bodyParser.json());


    app.use(cors());

    //Routes
    app.use("/auth", auth);

    // start express server
    app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));

}).catch(error => console.log(error));