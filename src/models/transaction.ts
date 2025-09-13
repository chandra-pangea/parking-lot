import mongoose, { Document, Schema } from 'mongoose';
import { VehicleType } from '../types';

export interface ITransaction extends Document {
    vehicleId: string;
    parkingSpotId: string;
    entryTime: Date;
    exitTime?: Date;
    vehicleType: VehicleType;
    fees?: number;
}

const TransactionSchema = new Schema<ITransaction>({
    vehicleId: { type: String, required: true },
    parkingSpotId: { type: String, required: true },
    entryTime: { type: Date, required: true },
    exitTime: { type: Date },
    vehicleType: { type: String, enum: Object.values(VehicleType), required: true },
    fees: { type: Number }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);