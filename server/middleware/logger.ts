import express from "express";

//

const logger = (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
) => {
    console.log("------");
    console.log(req.method, "|", req.path);
    console.log("------");
    console.log("params", req.params);
    console.log("------");
    console.log("query", req.query);
    console.log("------");
    console.log("body", req.body);
    console.log("------");
    console.log("cookies", req.cookies);
    console.log("------");
    console.log("referer", req.headers.referer);
    console.log("------");

    next();
};

export default logger;
