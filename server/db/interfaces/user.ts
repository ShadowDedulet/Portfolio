import mongoose from "mongoose";

//

interface IUser {
    id?: string;
    _id?: mongoose.Types.ObjectId;
    login: string;
    password: string;
    email: string;
    role?: mongoose.Types.ObjectId;
    living: boolean;
    confirmed: boolean;
    confirmationToken?: string;
    confirmationExpire?: Date;
    confirmationTime?: Date;
    createdAt?: Date;
}

export default IUser;
