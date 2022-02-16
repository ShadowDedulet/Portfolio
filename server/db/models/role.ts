import mongoose from "mongoose";
//
import IRole from "./../interfaces/role";

//

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["admin", "moderator", "user", "noauth"],
        default: "user",
    },
});

export default mongoose.model<IRole>("Role", RoleSchema);
