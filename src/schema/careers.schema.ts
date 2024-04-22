import * as mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema(
    {
        name: { type: String, default: null, required: true },
        code: { type: String },
        deleted_by: { type: String, default: null },
        deleted_at: { type: Date, default: null },
        created_at: { type: Number, index: true },
        updated_at: { type: Number },
        created_by: { type: String, default: null },
        updated_by: { type: String, default: null },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            currentTime: () => Date.now(),
        },
        collection: 'careers',
        autoIndex: true,
        autoCreate: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);
export default CareerSchema;
