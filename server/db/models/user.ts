import mongoose from "mongoose";
//
import IUser from "./../interfaces/user";

//

const UserSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            match: /^[a-zA-Z0-9_]{6,20}$/,
            required: true,
        },
        password: {
            type: String,
            // Now stores hash -> no match
            // match: /^[a-zA-Z0-9\_\-\+\=\?\!\ ]{6,20}$/,
            required: true,
        },
        email: {
            type: String,
            match: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
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
        confirmed: {
            type: Boolean,
            default: false,
            required: true,
        },
        confirmationToken: {
            type: String,
        },
        confirmationExpire: {
            type: Date,
            default: () => new Date(+new Date() + 30 * 60 * 1000), //30 minutes
        },
        confirmationTime: {
            type: Date,
        },
        createdAt: {
            type: Date,
            // expires: "30m",
            default: Date.now,
        },
    },
    { timestamps: true }
);

UserSchema.index(
    { confirmationExpire: 1 },
    {
        expireAfterSeconds: 0,
        partialFilterExpression: { confirmed: false },
    }
);

export default mongoose.model<IUser>("User", UserSchema);
