import { Router, Express } from 'express';
import { ParkingController } from '../controllers/parkingController';

const router = Router();
const parkingController = new ParkingController();

export const setParkingRoutes = (app: Express) => {
    router.post('/check-in', parkingController.checkIn);
    router.post('/check-out/:transactionId', parkingController.checkOut);
    router.get('/availability', parkingController.getAvailableSpots);
    app.use('/api/v1/parking', router);
};