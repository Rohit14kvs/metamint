import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import router from "./routes/auth";

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', router)
app.get('/', (_, res) => res.send('Hello'));

app.listen(5001, async () => {
    console.log('Server running at http://localhost:5000');

    try {
        await createConnection();
        console.log('Database connected!');
    } catch (err) {
        console.log(err);
    }
});