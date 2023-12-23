import { z } from "zod";

export const userSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string()
        .refine((value) => {
            return /\d/.test(value);
        }, {
            message: "Password must contain at least one number",
        })
        .refine((value) => {
            return value.length >= 8;
        }, {
            message: "Password must be exactly 8 characters long",
        }),
    phone: z.string()
        .refine((value) => {
            return /^\d{10}$/.test(value);
        }, {
            message: "Phone number must be numbers of 10 digits",
        }),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .refine((value) => {
            return /\d/.test(value);
        }, {
            message: "Password must contain at least one number",
        })
        .refine((value) => {
            return value.length >= 8;
        }, {
            message: "Password must be exactly 8 characters long",
        }),
});

export const vehicleSchema = z.object({
    vehicletype: z.string(),
    vehiclename: z.string(),
});

export const requestSchema = z.object({
    vehicle: vehicleSchema,
    email: z.string().email(),
    startdate: z.string(),
    enddate: z.string(),
});
