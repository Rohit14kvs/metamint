import { Request, Response, Router } from "express";
import { isEmpty, validate } from "class-validator";
import User from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cookie from 'cookie';
import dotenv from 'dotenv';
import auth from "../middleware/auth";

// eslint-disable-next-line @typescript-eslint/ban-types
const mapErrors = (errors: Object[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return errors.reduce((prev: any, err: any) => {
        prev[err.property] = Object.entries(err.constraints)[0][1]
    }, {})
}

dotenv.config();

//User Registration
const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        // Validate user data
        let errors: any = {}
        const emailUder = await User.findOne({ email });
        const usernameUser = await User.findOne({ username });

        if (emailUder) errors.email = 'Email is already taken'
        if (usernameUser) errors.username = 'Username is already taken'

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }

        //Create user
        const user = new User({ email, username, password });

        // Check for valid user
        errors = await validate(user);

        if (errors.length > 0) {

            return res.status(400).json(mapErrors(errors));
        }

        await user.save();

        //Return user
        return res.json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

// User login
const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const errors: any = {}

        if (isEmpty(username)) errors.username = 'Username must not be empty';
        if (isEmpty(password)) errors.password = 'Password must not be empty';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }

        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({ password: 'Password is incorrect' });
        }

        const token = jwt.sign({ username }, process.env.JWT_TOKEN);

        res.set(
            'Set-Cookie',
            cookie.serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                domain: 'localhost',
                maxAge: 3600,
                path: '/'
            })
        )

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Something went wrong!' });
    }
}

const me = (_: Request, res: Response) => {
    return res.json(res.locals.user);
}

const logout = (_: Request, res: Response) => {
    res.set(
        'Set-Cookie',
        cookie.serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            domain: 'localhost',
            expires: new Date(0),
            path: '/'
        })
    )

    return res.status(200).json({ sucess: true });
}

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.get('/logout', auth, logout);

export default router;

