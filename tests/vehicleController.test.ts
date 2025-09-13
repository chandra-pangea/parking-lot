import request from 'supertest';
import { app } from '../src/app';

describe('VehicleController', () => {
    describe('POST /vehicles', () => {
        it('should register a vehicle successfully', async () => {
            const vehicleData = {
                type: 'car',
                licensePlate: 'ABC123',
                entryTime: new Date(),
            };

            const response = await request(app)
                .post('/vehicles')
                .send(vehicleData)
                .expect(201);

            expect(response.body).toHaveProperty('message', 'Vehicle registered successfully');
            expect(response.body).toHaveProperty('vehicle');
            expect(response.body.vehicle).toHaveProperty('licensePlate', vehicleData.licensePlate);
        });

        it('should return an error for missing license plate', async () => {
            const vehicleData = {
                type: 'car',
                entryTime: new Date(),
            };

            const response = await request(app)
                .post('/vehicles')
                .send(vehicleData)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'License plate is required');
        });
    });

    describe('GET /vehicles/:licensePlate', () => {
        it('should retrieve vehicle information successfully', async () => {
            const licensePlate = 'ABC123';

            const response = await request(app)
                .get(`/vehicles/${licensePlate}`)
                .expect(200);

            expect(response.body).toHaveProperty('licensePlate', licensePlate);
        });

        it('should return an error for non-existent vehicle', async () => {
            const licensePlate = 'NONEXISTENT';

            const response = await request(app)
                .get(`/vehicles/${licensePlate}`)
                .expect(404);

            expect(response.body).toHaveProperty('error', 'Vehicle not found');
        });
    });
});
