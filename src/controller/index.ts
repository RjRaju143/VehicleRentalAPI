import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ZodError, z } from "zod";

import { loginSchema, requestSchema, userSchema } from "../config/validations";
import {
    bookVehicle,
    getVehicleData,
    loginUser, registerUser
} from "../services";
import { LoginUser, RegisterUser } from "../interfaces"
import { utils } from "../utils";
const JWT_SECRET = utils.JWT_SECRET;

export const registerController = async (req: Request, res: Response) => {
    try {
        const requestBody: RegisterUser = userSchema.parse(req.body);
        const { firstname, lastname, email, password, phone } = requestBody;
        const user = await registerUser({ firstname, lastname, email, password, phone });
        return res.status(201).json({
            message: 'User registered successfully',
            user: { firstname: user.firstname, lastname: user.lastname, email: user.email },
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.issues[0].message });
        }
        console.log({ error: 'User already exist' });
        return res.status(200).json({ message: 'User already exist' });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const requestBody: LoginUser = loginSchema.parse(req.body);
        const { email, password } = requestBody;
        const { token, user } = await loginUser({ email, password });
        return res.status(200)
            .cookie('login', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            .json({
                success: true,
                user: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                },
            });
    } catch (error: any) {
        if (error.message === 'Invalid email or password') {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.issues[0].message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const bookVehicleController = async (req: Request, res: Response) => {
    try {
        const { login } = req.cookies;
        if (!login) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const user = jwt.verify(login, JWT_SECRET) as JwtPayload;
        const userId = user.userId;
        const vehicleData = requestSchema.parse(req.body);
        const wheeltype = parseInt(req.query.wheels as string, 10);
        if (isNaN(wheeltype) || (wheeltype !== 2 && wheeltype !== 4)) {
            return res.status(400).json({ message: 'Invalid wheeltype. Only 2 or 4 are allowed.' });
        }
        const newVehicle = await bookVehicle({ userId, wheeltype, vehicleData });
        if (newVehicle === null) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(201).json({ message: `vehical booked successfully` });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.issues });
        }
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getVehicleDataController = async (req: Request, res: Response) => {
    try {
        const { login } = req.cookies;
        if (!login) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const user = jwt.verify(login, JWT_SECRET) as JwtPayload;
        const id = user.userId;
        const existingUser = await getVehicleData(id);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(existingUser);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const logoutController = (_: Request, res: Response) => {
    try {
        return res
            .clearCookie("login")
            .status(200)
            .json({ message: "Successfully logged out" });
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
};


