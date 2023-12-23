import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from "cookie-parser"
import router from './routers';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/v1",router)

app.all("*", (_: Request, res: Response) => {
    res.status(404).json({ status: 404, message: `page not found` })
})

export default app;
