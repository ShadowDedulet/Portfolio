// ++++++++++++++++++++++++++++++++++++++++++++++++ //
//          IMPORTS                                 //
// ------------------------------------------------ //
//      Node modules                                //
// ------------------------------------------------ //
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "fs";
import { AddressInfo } from "net";
import https from "https";

// ------------------------------------------------ //
//      Locals                                      //
// ------------------------------------------------ //
import db from "./db/db";

// ------------------------------------------------ //
//      Routers                                     //
// ------------------------------------------------ //
import router from "./routers/index";
import aboutRouter from "./routers/about";
import profileRouter from "./routers/profile";
import errorRouter from "./routers/error";

// ------------------------------------------------ //
//      local middleware                            //
// ------------------------------------------------ //
import logger from "./middleware/logger";
import translator from "./middleware/translator";
import jwtVerifier from "./middleware/jwtVerifier";
// ++++++++++++++++++++++++++++++++++++++++++++++++ //

// ++++++++++++++++++++++++++++++++++++++++++++++++ //
//          APP                                     //
// ------------------------------------------------ //
const app = express();

// ------------------------------------------------ //
//      Client setting                              //
// ------------------------------------------------ //
app.set("view engine", "ejs");
app.use(express.static("public"));

// ------------------------------------------------ //
//      Middleware                                  //
// ------------------------------------------------ //
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(logger);
app.use(translator);
app.use(jwtVerifier);

// ------------------------------------------------ //
//      Routs                                       //
// ------------------------------------------------ //
app.use("/about", aboutRouter);
app.use("/profile", profileRouter);
app.use("/error", errorRouter);
app.use("/", router);
app.use((_req, res, _next) => {
    res.status(404).send("page not found");
});

// ------------------------------------------------ //
//      Connect to Mongo DB                         //
// ------------------------------------------------ //
try {
    db.connect().then(() => db.insertExamples());
} catch (err) {
    console.log(err);
}

// ------------------------------------------------ //
//      Run HTTP-HTTPS servers                      //
// ------------------------------------------------ //
try {
    const httpServer = app.listen(
        parseInt(process.env.PORT_HTTP!),
        process.env.IP_DEV!,
        () => {
            let ardInfo = <AddressInfo>httpServer.address();
            console.log(
                `listening on http://${ardInfo.address}:${ardInfo.port}`
            );
        }
    );

    const tlsOptions = {
        key: fs.readFileSync("./cert/key.pem"),
        cert: fs.readFileSync("./cert/cert.pem"),
    };

    const httpsServer = https
        .createServer(tlsOptions, app)
        .listen(parseInt(process.env.PORT_HTTPS!), process.env.IP_DEV, () => {
            let ardInfo = <AddressInfo>httpsServer.address();
            console.log(
                `listening on https://${ardInfo.address}:${ardInfo.port}`
            );
        });
} catch (err) {
    console.log(`Could not create server\n${err}`);
}
// ++++++++++++++++++++++++++++++++++++++++++++++++ //
