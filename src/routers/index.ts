import express from "express"
const router = express.Router()

import {
    loginController,
    logoutController,
    registerController,
    bookVehicleController,
    getVehicleDataController
} from "../controller/index"

import { jwtVerify } from "../middlewares/jwtAuth/verify"

router.post(`/register`, registerController)
router.post(`/login`, loginController)

router.post(`/vehicles`, jwtVerify, bookVehicleController)

router.get(`/vehicles`, jwtVerify, getVehicleDataController);

router.get(`/logout`, jwtVerify, logoutController);

export default router;





