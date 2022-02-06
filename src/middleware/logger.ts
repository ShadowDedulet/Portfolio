import express from "express";

const logger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    console.log("------");
    console.log(req.method, "|", req.path, "|", req.params, "|", req.query);
    console.log(req.body);
    console.log("------");
    next();
};

export default logger;
