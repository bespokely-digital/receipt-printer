import express from 'express';
import { connectPrinter, printReceipt } from '../controllers/printController.js';

const router = express.Router();

router.post('/connect', connectPrinter); // New route to connect to the printer
router.post('/print', printReceipt);     // Existing route to print

export default router;