import express from "express";
//
import db from "./../db/db";
import foos from "./../functions/functions";

//

const jwtAuthorizator = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.body.jwtdata || !req.body.jwtdata.login)
        return foos.sendJson(req, res, 401);

    let login = req.body.jwtdata.login;
    try {
        let user = await db.findUser({ login: login });

        if (!user) return foos.sendJson(req, res, 500);

        await user.populate("role");
        req.body.user = user;
    } catch (err) {
        console.log(err);
        return foos.sendJson(req, res, 500);
    }
    next();
};

export default jwtAuthorizator;
