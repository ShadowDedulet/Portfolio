import mongoose from "mongoose";

//

interface IRole {
    id?: string;
    _id?: mongoose.Types.ObjectId;
    name: string;
}

export default IRole;
