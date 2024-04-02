
import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, default: null, required: true },
        pure_name: { type: String, index: true },
        email: { type: String, default: null, index: true,unique: true },
        password: { type: String, default: null, select: false },
        phone: { type: String, default: null, unique: true },
        address: {type: String},
        createdBy: { type: String, default: null },
        createdAt: { type: Date, default: null },
        updatedBy: { type: String, default: null },
        updatedAt: { type: Date, default: null },
        deletedBy: { type: String, default: null, index: true },
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps: true,
        collection: "users",
        autoIndex: true,
        autoCreate: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
export default UserSchema;
