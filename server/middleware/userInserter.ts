import express from "express";
//
import db from "./../db/db";
import foos from "./../functions/functions";
import md5 from "blueimp-md5";

//

const userInserter = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.body.login || !req.body.email || !req.body.password)
        return foos.sendJson(req, res, 400, "data");

    if (db.connection.readyState !== 1) return foos.sendJson(req, res, 500);

    if (req.body.jwtdata) return foos.sendJson(req, res, 409, "logout");

    try {
        let role = await db.findRole({ name: "user" });
        if (!role) return foos.sendJson(req, res, 500);

        let password = md5(req.body.password + process.env.PEPPER!);
        let confirmationToken = md5(
            req.body.login + process.env.PEPPER! + Date.now()
        );
        req.body.confirmationToken = confirmationToken;

        let [_, ret] = await db.insertUser({
            login: req.body.login,
            email: req.body.email,
            password: password,
            role: role._id,
            living: true,
            confirmed: false,
            confirmationToken: confirmationToken,
        });

        if (ret === "db") foos.sendJson(req, res, 500);
        else if (ret !== "ok") foos.sendJson(req, res, 409, ret);

        next();
    } catch (err) {
        console.log(err);
        return foos.sendJson(req, res, 500);
    }
};

export default userInserter;
