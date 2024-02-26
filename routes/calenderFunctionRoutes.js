import express from 'express';
import { getBusyIntervals } from '../controllers/calenderFunctionsController.js';

const calenderRoutes = express.Router();

calenderRoutes.route('/getBusyEvents').post(getBusyIntervals);

export default calenderRoutes;