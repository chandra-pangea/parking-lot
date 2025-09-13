import mongoose from 'mongoose';
import AllocationService from '../src/services/allocationService';
import ParkingSpot from '../src/models/parkingSpot';
import { VehicleType } from '../src/types';

describe('AllocationService', () => {
    let allocationService: AllocationService;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI || '', {});
        await ParkingSpot.deleteMany({});
    });

    afterAll(async () => {
        await ParkingSpot.deleteMany({});
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        allocationService = new AllocationService([]);
        await ParkingSpot.deleteMany({});
    });

    it('should allocate a parking spot for a motorcycle', async () => {
        await ParkingSpot.create({ size: VehicleType.MOTORCYCLE, isAvailable: true, location: 'M1' });
        const spot = await allocationService.allocateSpot(VehicleType.MOTORCYCLE);
        expect(spot).not.toBeNull();
        expect(spot?.size).toBe(VehicleType.MOTORCYCLE);
        expect(spot?.isAvailable).toBe(false);
    });

    it('should allocate a parking spot for a car', async () => {
        await ParkingSpot.create({ size: VehicleType.CAR, isAvailable: true, location: 'C1' });
        const spot = await allocationService.allocateSpot(VehicleType.CAR);
        expect(spot).not.toBeNull();
        expect(spot?.size).toBe(VehicleType.CAR);
        expect(spot?.isAvailable).toBe(false);
    });

    it('should not allocate a parking spot if none are available', async () => {
        await ParkingSpot.create({ size: VehicleType.BUS, isAvailable: false, location: 'B1' });
        const spot = await allocationService.allocateSpot(VehicleType.BUS);
        expect(spot).toBeNull();
    });

    it('should allocate the correct spot based on vehicle size', async () => {
        await ParkingSpot.create({ size: VehicleType.CAR, isAvailable: true, location: 'C2' });
        await ParkingSpot.create({ size: VehicleType.MOTORCYCLE, isAvailable: true, location: 'M2' });
        await ParkingSpot.create({ size: VehicleType.BUS, isAvailable: true, location: 'B2' });

        const carSpot = await allocationService.allocateSpot(VehicleType.CAR);
        const motorcycleSpot = await allocationService.allocateSpot(VehicleType.MOTORCYCLE);
        const busSpot = await allocationService.allocateSpot(VehicleType.BUS);

        expect(carSpot?.size).toBe(VehicleType.CAR);
        expect(motorcycleSpot?.size).toBe(VehicleType.MOTORCYCLE);
        expect(busSpot?.size).toBe(VehicleType.BUS);
    });
});