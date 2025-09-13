import request from 'supertest';
import { app } from '../src/app';
import ParkingSpot from '../src/models/parkingSpot';
import Transaction from '../src/models/transaction';

describe('ParkingController', () => {
    beforeAll(async () => {
        await ParkingSpot.deleteMany({});
        await Transaction.deleteMany({});
        await ParkingSpot.create({ size: 'car', isAvailable: true, location: 'A1' });
    });

    afterAll(async () => {
        await ParkingSpot.deleteMany({});
        await Transaction.deleteMany({});
    });

    describe('Check-In', () => {
        it('should allocate a parking spot for a vehicle', async () => {
            const vehicleData = {
                type: 'car',
                licensePlate: 'ABC123'
            };

            const response = await request(app)
                .post('/api/parking/check-in')
                .send(vehicleData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('parkingSpotId');
            expect(response.body).toHaveProperty('transactionId');
        });

        it('should return an error if no parking spots are available', async () => {
            await ParkingSpot.updateMany({}, { isAvailable: false });

            const vehicleData = {
                type: 'car',
                licensePlate: 'XYZ789'
            };

            const response = await request(app)
                .post('/api/parking/check-in')
                .send(vehicleData);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('No available parking spots');
        });

        it('should check in a car', async () => {
            await ParkingSpot.updateMany({}, { isAvailable: true });
            const res = await request(app)
                .post('/api/parking/check-in')
                .send({ type: 'car', licensePlate: 'TEST123' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('parkingSpotId');
            expect(res.body).toHaveProperty('transactionId');
        });
    });

    describe('Check-Out', () => {
        it('should calculate the parking fee and complete the transaction', async () => {
            const spot = await ParkingSpot.create({ size: 'car', isAvailable: false, location: 'B1' });
            const transaction = await Transaction.create({
                vehicleId: 'someVehicleId',
                parkingSpotId: spot._id,
                entryTime: new Date(Date.now() - 3600000), // 1 hour ago
                vehicleType: 'car'
            });

            const response = await request(app)
                .post(`/api/parking/check-out/${transaction._id}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('fee');
            expect(response.body.fee).toBeGreaterThan(0);
        });

        it('should return an error if the transaction does not exist', async () => {
            const response = await request(app)
                .post('/api/parking/check-out/invalidTransactionId')
                .send();

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Transaction not found or already checked out');
        });

        it('should check out a car', async () => {
            const transaction = await Transaction.findOne({ vehicleId: 'TEST123' });
            const res = await request(app)
                .post(`/api/parking/check-out/${transaction?._id}`)
                .send();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('fee');
        });
    });
});
