import express from 'express';
import connectDB from './config/db.js';

const app = express();

connectDB();