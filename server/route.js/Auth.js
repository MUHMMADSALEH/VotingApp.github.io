import express from 'express';
import { register, signin } from '../controllers/auth.js';

const router= express.Router();


router.post('/register',register)
router.post('/login',signin)





export default router;