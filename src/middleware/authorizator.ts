import express from "express";
import mongoose from "mongoose";
//
import db from "./../db/db";
import { IUser } from "./../db/schemas";
//

const authorizator = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.body.login || !req.body.password)
        return res.status(401).send("No login/password provided!");

    if (db.connection.readyState !== 1)
        return res.status(500).send("Not connected to DB!");

    const User: mongoose.Model<IUser> = db.connection.model("User");
    if (!User) return res.status(500).send("No User model!");

    try {
        let users = await User.find({
            login: req.body.login,
            password: req.body.password,
        }).populate("role");

        if (users.length !== 1)
            return res.status(401).send("Wrong login/password!");

        req.body.userID = users[0].id;
        req.body.role = users[0].role;

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("User query error!");
    }
};

export default authorizator;
