import mongoose from "mongoose";

const Schemas: { [key: string]: mongoose.Schema } = {
    Role: new mongoose.Schema({
        name: {
            type: String,
            enum: ["admin", "moderator", "user", "noauth"],
            default: "user",
        },
    }),

    User: new mongoose.Schema({
        login: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9_]{6,20}$/,
        },
        password: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9\_\-\+\=\?\!\ ]{6,20}$/,
        },
        roleID: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Role",
        },
        living: {
            type: Boolean,
            default: true,
        },
        regDate: {
            type: Date,
            default: Date.now,
        },
    }),
};

export default Schemas;
