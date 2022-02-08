//      Import node modules

import express from "express";
import "dotenv/config";
import { AddressInfo } from "net";
import bodyParser from "body-parser";

//      Import local

import db from "./src/db/db";

//      Import routers

import router from "./src/routers/index";
import aboutRouter from "./src/routers/about";

//      Local middlewares

import logger from "./src/middleware/logger";

//      Set app properties

const app = express();

// views + static
app.set("view engine", "ejs");
app.use(express.static("public"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger);

// routs
app.use("/about", aboutRouter);
app.use("/", router);

//      Connect to DB

try {
    db.connect()
        .then(() => db.setModels())
        .then(() => db.insertExamples());
} catch (err) {
    console.log(err);
}
//      Run server

let server = app.listen(process.env.PORT_DEV, () => {
    let addrInfo = <AddressInfo>server.address();
    console.log(`listening on ${addrInfo.address}:${addrInfo.port}`);
});
