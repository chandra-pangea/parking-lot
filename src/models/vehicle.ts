import mongoose, { Document, Schema } from 'mongoose';
import { VehicleType } from '../types';

export interface IVehicle extends Document {
    licensePlate: string;
    type: VehicleType;
    entryTime?: Date;
}

const VehicleSchema = new Schema<IVehicle>({
    licensePlate: { type: String, required: true, unique: true },
    type: { type: String, enum: Object.values(VehicleType), required: true },
    entryTime: { type: Date, default: Date.now }
});

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);