import express from "express";
import md5 from "blueimp-md5";
//
import db from "./../db/db";
import foos from "./../functions/functions";

//

const authorizator = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.body.login || !req.body.password)
        return foos.sendJson(req, res, 400);

    if (db.connection.readyState !== 1) return foos.sendJson(req, res, 500);

    if (req.body.jwtdata) return foos.sendJson(req, res, 409, "logout");

    let password = md5(req.body.password + process.env.PEPPER!);
    try {
        let user = await db.findUser({
            $or: [
                {
                    login: req.body.login,
                    password: password,
                },
                {
                    email: req.body.login,
                    password: password,
                },
            ],
        });

        if (!user) return foos.sendJson(req, res, 409, "auth");
        if (!user.confirmed) return foos.sendJson(req, res, 409, "confirm");

        if (!("role" in user)) return foos.sendJson(req, res, 500);

        if (!user.living) return foos.sendJson(req, res, 409, "dead");

        req.body.user = user;
        await user.populate("role");
        req.body.role = user.role;

        next();
    } catch (err) {
        console.log(err);
        return foos.sendJson(req, res, 500);
    }
};

export default authorizator;
