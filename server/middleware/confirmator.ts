import express from "express";
//
import db from "./../db/db";
import foos from "./../functions/functions";

//

const confirmator = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.query.CT) return foos.sendJson(req, res, 400);

    if (db.connection.readyState !== 1) return foos.sendJson(req, res, 500);

    try {
        let confirmationToken = req.query.CT.toString();
        let user = await db.findUser({
            confirmationToken: confirmationToken,
        });

        if (!user) return foos.sendJson(req, res, 409, "token");

        if (user.confirmed) return foos.sendJson(req, res, 409, "redo");

        user.confirmed = true;
        user.confirmationToken = undefined;
        user.confirmationExpire = new Date(+new Date() - 1000);
        user.confirmationTime = new Date();
        user.save();

        next();
    } catch (err) {
        console.log(err);
        return foos.sendJson(req, res, 500);
    }
};

export default confirmator;
