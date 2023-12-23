import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LoginUser, RegisterUser, bookVehicleInterface } from "../interfaces"
import { prisma, utils } from "../utils"
const JWT_SECRET = utils.JWT_SECRET;

export const registerUser = async ({
    firstname,
    lastname,
    email,
    password,
    phone,
}: RegisterUser) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                phone,
            },
        });
        return user;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async ({ email, password }: LoginUser) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

            return { token, user };
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        throw error;
    }
};

export const getUserData = async (login: string) => {
    try {
        const decode = jwt.verify(login, JWT_SECRET) as JwtPayload;
        const userId: string = decode.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: { id: true, firstname: true, lastname: true, email: true, phone: true },
        });
        return user;
    } catch (error) {
        throw error;
    }
};

export async function bookVehicle({ userId, wheeltype, vehicleData }: bookVehicleInterface) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            return `user not found`;
        }
        const newVehicle = await prisma.vehicles.create({
            data: {
                wheeltype: wheeltype,
                vehicle: {
                    create: {
                        vehicletype: vehicleData.vehicle.vehicletype,
                        vehiclename: vehicleData.vehicle.vehiclename,
                    },
                },
                userData: {
                    connect: { id: userId },
                },
                startdate: vehicleData.startdate,
                enddate: vehicleData.enddate,
            },
        });
        return newVehicle;
    } catch (error) {
        return error;
    }
}

export async function getVehicleData(userId: string) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                vehicles: {
                    select: {
                        wheeltype: true,
                        vehicle: {
                            select: {
                                vehicletype: true,
                                vehiclename: true,
                            },
                        },
                        startdate: true,
                        enddate: true,
                    },
                },
            },
        });
        if (!existingUser || !existingUser.vehicles || existingUser.vehicles.length === 0) {
            return { message: 'No vehicles found for the user.' }
        }
        return existingUser;
    } catch (error) {
        console.log(error)
        return error;
    }
}




