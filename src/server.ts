import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import trim from "./middleware/trim";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());

app.get('/', (_, res) => res.send('Hello'));
app.use('/api/auth', authRoutes)

app.listen(5001, async () => {
    console.log('Server running at http://localhost:5000');

    try {
        await createConnection();
        console.log('Database connected!');
    } catch (err) {
        console.log(err);
    }
});