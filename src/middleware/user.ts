import { NextFunction, Request, Response } from "express";
import User from "../entities/User";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) next()

        const { username }: any = jwt.verify(token, process.env.JWT_TOKEN)

        const user = await User.findOne({ username });

        res.locals.user = user;

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Unauthenticated' })

    }
}