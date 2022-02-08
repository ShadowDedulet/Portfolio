import express from "express";
import mongoose from "mongoose";
//
import db from "./../db/db";
import { IRole } from "./../db/schemas";
//

const authenticator = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.body.role) return res.status(403).send("No role provided!");

    if (db.connection.readyState !== 1)
        return res.status(500).send("Not connected to DB!");

    const Role: mongoose.Model<IRole> = db.connection.model("Role");
    if (!Role) return res.status(500).send("No Role model!");

    try {
        let roles = await Role.find({ _id: req.body.role });
        if (roles.length !== 1) return res.status(403).send("Wrong role!");

        res.status(200).send(`${req.body.userID}-${roles[0].name} found`);

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Role query error!");
    }
};

export default authenticator;
