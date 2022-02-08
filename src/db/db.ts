import mongoose from "mongoose";
//
import { RoleSchema, UserSchema } from "./schemas";
import { IRole, IUser } from "./schemas";
//

const getAtlasUri = () => {
    let url = process.env
        .ATLAS_URL!.replace("<username>", process.env.LOGIN_R_W!)
        .replace("<password>", process.env.PSWRD_R_W!)
        .replace("<DB_NAME>", process.env.DB_NAME!);
    console.log(url);
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
    password: "qwerty123",
    email: "admin@service.example",
    living: true,
};
const exampleUserUser: IUser = {
    login: "exampleUser",
    password: "security123",
    email: "user@service.example",
    living: true,
};

const insertExample = async (exampleRole: IRole, exampleUser: IUser) => {
    try {
        const Role: mongoose.Model<IRole> = DB.connection.model("Role");
        if (!Role) throw "No Role model";

        let isExistRole = await Role.find({ name: exampleRole.name });
        if (isExistRole.length > 0)
            throw `Role ${isExistRole[0].name} already exists`;

        let roleDoc = await Role.create(exampleRole);
        if (!roleDoc) throw `Couldn't create role`;
        console.log(`Created example Role ${roleDoc.name}`);

        exampleUser.role = roleDoc._id;

        const User: mongoose.Model<IUser> = DB.connection.model("User");
        if (!User) throw "No User model";

        let isExistUser = await User.find({
            $or: [{ login: exampleUser.login }, { email: exampleUser.email }],
        });
        if (isExistUser.length > 0)
            throw `User ${isExistUser[0].login}/${isExistUser[0].email} already exists`;

        let userDoc = await User.create(exampleUser);
        if (!userDoc) throw `Couldn't create user`;
        console.log(`Created example User ${userDoc.login}-${userDoc.email}`);
    } catch (err) {
        console.log("Error:", err);
    }
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

    setModels: () => {
        try {
            DB.connection.model("Role", RoleSchema);
            DB.connection.model("User", UserSchema);
        } catch (err) {
            throw `Failed to set Models\n${err}`;
        }
        console.log("Models set");
    },

    insertExamples: async () => {
        await insertExample(exampleRoleAdmin, exampleUserAdmin);
        await insertExample(exampleRoleUser, exampleUserUser);
    },
};

export default DB;
