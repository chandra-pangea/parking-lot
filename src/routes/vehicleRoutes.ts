import { Router } from 'express';
import VehicleController from '../controllers/vehicleController';
import { Express } from 'express-serve-static-core';

const router = Router();
const vehicleController = VehicleController;

const setVehicleRoutes = (app: Express) => {
    app.use('/api/v1/vehicles', router);
    router.post('/register', vehicleController.registerVehicle.bind(vehicleController));
    router.get('/:licensePlate', vehicleController.getVehicleInfo.bind(vehicleController));
};

export default setVehicleRoutes;