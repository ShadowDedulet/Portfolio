import express from "express";
//
import db from "./../db/db";
import foos from "./../functions/functions";

//

const authenticator = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.body.role) return foos.sendJson(req, res, 500);

    if (db.connection.readyState !== 1) return foos.sendJson(req, res, 500);

    try {
        let role = await db.findRole({ _id: req.body.role });
        if (!role) return foos.sendJson(req, res, 500);

        next();
    } catch (err) {
        console.log(err);
        return foos.sendJson(req, res, 500);
    }
};

export default authenticator;
