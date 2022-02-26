import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { User } from "../entities/User";

const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        // Validate data
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

        // Checlk for valid user
        errors = await validate(user);

        if (errors.length > 0) return res.status(400).json({ errors });

        await user.save();

        //Return user
        return res.json(user);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

const router = Router();
router.post('/register', register);

export default router;

