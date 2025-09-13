# Parking Lot System

## Overview
The Parking Lot System is a backend application designed to manage vehicle entry and exit, parking space allocation, and fee calculation for a smart parking lot. It utilizes Node.js, Express, and MongoDB to provide a robust solution for urban parking management.

## Features
- **Parking Spot Allocation**: Automatically assigns available parking spots based on vehicle size (motorcycle, car, bus).
- **Check-In and Check-Out**: Records entry and exit times of vehicles.
- **Parking Fee Calculation**: Calculates fees based on the duration of stay and vehicle type.
- **Real-Time Availability Update**: Updates the availability of parking spots in real-time as vehicles enter and leave.

## Architecture
The system is structured into several components:
- **Models**: Defines the data structure for parking spots, vehicles, and transactions.
- **Controllers**: Manages the business logic for parking and vehicle operations.
- **Routes**: Defines the API endpoints for interacting with the system.
- **Services**: Contains the core logic for allocation and fee calculation.
- **Utilities**: Handles concurrency issues to ensure smooth operations.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/parking-lot-system.git
   ```
2. Navigate to the project directory:
   ```
   cd parking-lot-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
1. Start the MongoDB server.
2. Run the application:
   ```
   npm start
   ```

### API Endpoints
- **POST /vehicles**: Register a new vehicle.
- **GET /vehicles/:id**: Retrieve vehicle information.
- **POST /parking/checkin**: Check in a vehicle and allocate a parking spot.
- **POST /parking/checkout**: Check out a vehicle and calculate fees.

## Testing
To run the test cases, use the following command:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.