import mongoose, { Document, Schema } from 'mongoose';
import { VehicleType } from '../types';

export interface IParkingSpot extends Document {
    size: VehicleType;
    isAvailable: boolean;
    location: string;
}

const ParkingSpotSchema = new Schema<IParkingSpot>({
    size: { type: String, enum: Object.values(VehicleType), required: true },
    isAvailable: { type: Boolean, default: true },
    location: { type: String, required: true }
});

export default mongoose.model<IParkingSpot>('ParkingSpot', ParkingSpotSchema);