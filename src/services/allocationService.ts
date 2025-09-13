import ParkingSpot, { IParkingSpot } from '../models/parkingSpot';
import { VehicleType } from '../types';

export class AllocationService {
    private parkingSpots: IParkingSpot[];

    constructor(parkingSpots: IParkingSpot[]) {
        this.parkingSpots = parkingSpots;
    }

    public async allocateSpot(vehicleType: VehicleType): Promise<IParkingSpot | null> {
        // Atomically find and update an available spot
        return ParkingSpot.findOneAndUpdate(
            { size: vehicleType, isAvailable: true },
            { isAvailable: false },
            { new: true }
        );
    }

    public async releaseSpot(spotId: string): Promise<void> {
        await ParkingSpot.findByIdAndUpdate(spotId, { isAvailable: true });
    }
}
export default AllocationService;