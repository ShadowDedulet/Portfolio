import mongoose from "mongoose";
//
import schemas from "./schemas";
//

const getAtlasUrl = () => {
    return process.env
        .ATLAS_URL!.replace("<username>", process.env.LOGIN_R!)
        .replace("<password>", process.env.PSWRD_R!)
        .replace("<DB_NAME>", process.env.DB_NAME!);
};

const DB = {
    connection: new mongoose.Connection(),

    isConnected: false,

    connect: async () => {
        mongoose.Promise = global.Promise;

        try {
            await mongoose.connect(getAtlasUrl(), {
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
            for (let k of Object.keys(schemas)) {
                DB.connection.model(k, schemas[k]);
            }
        } catch (err) {
            throw `Failed to set Models\n${err}`;
        }
        console.log("Models set");
    },
};

export default DB;
