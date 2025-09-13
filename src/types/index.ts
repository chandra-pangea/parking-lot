export enum VehicleType {
    MOTORCYCLE = 'motorcycle',
    CAR = 'car',
    BUS = 'bus'
}

export interface IVehicle {
    licensePlate: string;
    type: VehicleType;
    entryTime?: Date;
}

export interface IParkingSpot {
    _id?: string;
    size: VehicleType;
    isAvailable: boolean;
    location: string;
}

export interface ITransaction {
    _id?: string;
    vehicleId: string;
    parkingSpotId: string;
    entryTime: Date;
    exitTime?: Date;
    vehicleType: VehicleType;
    fees?: number;
}