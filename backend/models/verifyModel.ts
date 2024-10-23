import mongoose, { Schema, Document, Model } from 'mongoose'
import moment from 'moment-timezone';

export interface IVerify extends Document {
    _id: string;
    user_id: String;
    token: string;
    expireAt: Date;
}

const verifySchema: Schema<IVerify> = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
    },
    expireAt: {
        type: Date,
        default: () => moment().tz('Asia/Kolkata').add(24, 'minutes').toDate(),
        index: { expires: 1440 }
    }
}, { timestamps: true })

const Verify: Model<IVerify> = mongoose.model<IVerify>("Verify", verifySchema);
export default Verify;