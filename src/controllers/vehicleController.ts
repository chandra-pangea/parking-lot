import { Request, Response } from 'express';
import Vehicle from '../models/vehicle';

class VehicleController {
    async registerVehicle(req: Request, res: Response) {
        try {
            const { type, licensePlate } = req.body;
            const vehicle = new Vehicle({ type, licensePlate, entryTime: new Date() });
            await vehicle.save();
            res.status(201).json(vehicle);
        } catch (error) {
            res.status(500).json({ message: 'Error registering vehicle', error });
        }
    }

    async getVehicleInfo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const vehicle = await Vehicle.findById(id);
            if (!vehicle) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            res.status(200).json(vehicle);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving vehicle information', error });
        }
    }
}

export default new VehicleController();