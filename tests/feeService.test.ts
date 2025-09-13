import FeeService from '../src/services/feeService';
import { VehicleType } from '../src/types';

describe('FeeService', () => {
    const feeService = new FeeService();

    it('calculates fee for car', () => {
        const transaction = {
            entryTime: new Date('2023-01-01T10:00:00Z'),
            exitTime: new Date('2023-01-01T12:00:00Z'),
            vehicleType: VehicleType.CAR
        } as any;
        expect(feeService.calculateFee(transaction)).toBe(20);
    });

    it('throws if exitTime missing', () => {
        const transaction = {
            entryTime: new Date(),
            vehicleType: VehicleType.CAR
        } as any;
        expect(() => feeService.calculateFee(transaction)).toThrow();
    });

    it('throws if vehicleType missing', () => {
        const transaction = {
            entryTime: new Date(),
            exitTime: new Date()
        } as any;
        expect(() => feeService.calculateFee(transaction)).toThrow();
    });
});