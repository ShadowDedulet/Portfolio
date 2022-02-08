import mongoose from "mongoose";

// Interfaces for Schemas
interface IRole {
    id?: string;
    _id?: mongoose.Types.ObjectId;
    name: string;
}

interface IUser {
    id?: string;
    _id?: mongoose.Types.ObjectId;
    login: string;
    password: string;
    email: string;
    role?: mongoose.Types.ObjectId;
    living: boolean;
    regDate?: Date;
}

// Schemas
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["admin", "moderator", "user", "noauth"],
        default: "user",
    },
});

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        match: /^[a-zA-Z0-9_]{6,20}$/,
        required: true,
    },
    password: {
        type: String,
        match: /^[a-zA-Z0-9\_\-\+\=\?\!\ ]{6,20}$/,
        required: true,
    },
    email: {
        type: String,
        match: /^/,
        required: true,
    },
    role: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Role",
        required: true,
    },
    living: {
        type: Boolean,
        default: true,
        required: true,
    },
    regDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

export { RoleSchema, UserSchema, IRole, IUser };
