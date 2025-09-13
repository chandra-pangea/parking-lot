import { Request, Response, Router } from 'express';
import Transaction from '../models/transaction';
import ParkingSpot from '../models/parkingSpot';
import AllocationService from '../services/allocationService';
import FeeService from '../services/feeService';
import { VehicleType } from '../types';

export class ParkingController {
    private allocationService = new AllocationService([]);
    private feeService = new FeeService();

    public async checkIn(req: Request, res: Response): Promise<void> {
        try {
            const { type, licensePlate } = req.body;
            if (!type || !licensePlate) {
                res.status(400).json({ message: 'type and licensePlate are required' });
                return;
            }
            const spot = await this.allocationService.allocateSpot(type as VehicleType);
            if (!spot) {
                res.status(400).json({ message: 'No available parking spots' });
                return;
            }
            const transaction = await Transaction.create({
                vehicleId: licensePlate,
                parkingSpotId: spot._id,
                entryTime: new Date(),
                vehicleType: type
            });
            res.status(200).json({
                message: 'Checked in successfully',
                parkingSpotId: spot._id,
                transactionId: transaction._id
            });
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    public async checkOut(req: Request, res: Response): Promise<void> {
        try {
            const { transactionId } = req.params;
            const transaction = await Transaction.findById(transactionId);
            if (!transaction || transaction.exitTime) {
                res.status(404).json({ message: 'Transaction not found or already checked out' });
                return;
            }
            transaction.exitTime = new Date();
            const fee = this.feeService.calculateFee(transaction);
            transaction.fees = fee;
            await transaction.save();
            await this.allocationService.releaseSpot(transaction.parkingSpotId);
            res.status(200).json({ message: 'Checked out successfully', fee });
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    public async getAvailableSpots(req: Request, res: Response): Promise<void> {
        try {
            const availableSpots = await ParkingSpot.find({ isAvailable: true });
            res.status(200).json(availableSpots);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}
