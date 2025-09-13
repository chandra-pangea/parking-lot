import { VehicleType } from '../types';
import { ITransaction } from '../models/transaction';

export class FeeService {
    private static readonly rates = {
        [VehicleType.MOTORCYCLE]: 5,
        [VehicleType.CAR]: 10,
        [VehicleType.BUS]: 15
    };

    public calculateFee(transaction: ITransaction): number {
        if (!transaction.exitTime) throw new Error('Exit time is required');
        if (!transaction.vehicleType) throw new Error('Vehicle type is required');
        const duration = Math.ceil(
            (transaction.exitTime.getTime() - transaction.entryTime.getTime()) / (1000 * 60 * 60)
        );
        const rate = FeeService.rates[transaction.vehicleType];
        return duration * rate;
    }
}
export default FeeService;