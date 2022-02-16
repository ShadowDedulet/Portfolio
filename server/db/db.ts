import mongoose from "mongoose";
import md5 from "blueimp-md5";

// Import models and schema interfaces

import Role from "./models/role";
import User from "./models/user";
import IRole from "./interfaces/role";
import IUser from "./interfaces/user";

//

const getAtlasUri = () => {
    let url = process.env
        .ATLAS_URI!.replace("<username>", process.env.LOGIN_R_W!)
        .replace("<password>", process.env.PSWRD_R_W!)
        .replace("<DB_NAME>", process.env.DB_NAME!);
    return url;
};

const exampleRoleAdmin: IRole = {
    name: "admin",
};
const exampleRoleUser: IRole = {
    name: "user",
};
const exampleUserAdmin: IUser = {
    login: "exampleAdmin",
    password: md5(
        md5("security123" + md5(process.env.SALT!)) + process.env.PEPPER!
    ),
    email: "admin@service.example",
    living: true,
    confirmed: true,
    confirmationToken: undefined,
    confirmationExpire: new Date(+new Date() - 1000),
};

const exampleUserUser: IUser = {
    login: "exampleUser",
    password: md5(
        md5("qwerty123" + md5(process.env.SALT!)) + process.env.PEPPER!
    ),
    email: "user@service.example",
    living: true,
    confirmed: true,
    confirmationToken: undefined,
    confirmationExpire: new Date(+new Date() - 1000),
};

const DB = {
    connection: new mongoose.Connection(),

    isConnected: false,

    connect: async () => {
        mongoose.Promise = global.Promise;

        try {
            await mongoose.connect(getAtlasUri(), {
                serverSelectionTimeoutMS: 5000,
            });
        } catch (err) {
            throw `Failed to connect to MongoDB\n${err}`;
        }

        console.log("Mongoose connected");
        DB.connection = mongoose.connection;
        DB.isConnected = true;
    },

    insertExamples: async () => {
        // User
        let role = await DB.insertRole(exampleRoleUser);
        if (role) exampleUserUser.role = role;
        await DB.insertUser(exampleUserUser);

        // Admin
        role = await DB.insertRole(exampleRoleAdmin);
        if (role) exampleUserAdmin.role = role;
        await DB.insertUser(exampleUserAdmin);

        // // Display data
        // let roles = await Role.find();
        // let users = await User.find();
        // console.log("Roles:\n", roles);
        // console.log("Users:\n", users);
    },

    insertRole: async (role: IRole) => {
        try {
            let isExistRole = await Role.find({ name: role.name });
            if (isExistRole.length > 0)
                throw `Role ${isExistRole[0].name} already exists`;

            let roleDoc = await Role.create(role);
            if (!roleDoc) throw `Couldn't create role`;
            console.log(`Created Role \"${roleDoc.name}\"`);

            return roleDoc._id;
        } catch (err) {
            console.log(err);
        }
    },

    insertUser: async (user: IUser): Promise<[IUser | undefined, string]> => {
        try {
            if (!user.role) throw "No role provided";

            let ret = "";

            let isExistUser = await User.find({
                login: user.login,
            });

            if (isExistUser.length > 0) ret += "login";

            isExistUser = await User.find({
                email: user.email,
            });

            if (isExistUser.length > 0) ret += "email";

            if (ret) return [undefined, ret];

            let userDoc = await User.create(user);
            if (!userDoc) throw `Couldn't create user`;
            console.log(`Created User "${userDoc.login}"/"${userDoc.email}"`);

            ret = "ok";
            return [userDoc, ret];
        } catch (err) {
            console.log(err);
            return [undefined, "db"];
        }
    },

    findRole: async (filter: mongoose.FilterQuery<IRole>) => {
        let roles = await Role.findOne(filter).exec();

        return roles;
    },

    findUser: async (filter: mongoose.FilterQuery<IUser>) => {
        let users = await User.findOne(filter).exec();

        return users;
    },
};

export default DB;
