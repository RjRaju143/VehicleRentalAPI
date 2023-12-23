import { Request, Response, NextFunction } from "express"
import JWT from "jsonwebtoken"
import { utils } from "../../utils"

const JWT_SECRET = utils.JWT_SECRET

interface CustomResponse extends Response {
    decode?: any;
}

export const jwtVerify = (req: Request, res: CustomResponse, next: NextFunction) => {
    const { login } = req.cookies;
    if (!login) {
        return res.status(400).json({ message: `Unauthorized` });
    }

    try {
        const decode = JWT.verify(login, JWT_SECRET);
        res.decode = decode;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
