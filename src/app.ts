import express from 'express';
import dotenv from 'dotenv';
import { setParkingRoutes } from './routes/parkingRoutes';
import { connectDB } from './utils/db';
import setVehicleRoutes from './routes/vehicleRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Set up routes
setParkingRoutes(app);
setVehicleRoutes(app);

// Start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export { app };