import Axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
const Login: NextPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [agreement, serAgreement] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const submitForm = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const res = await Axios.post('/auth/login', {
                username, password
            })
            console.log(res.data);
        } catch (error) {
            console.log(error)
            setErrors(error)
        }

    }

    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex justify-center items-center h-screen flex-col">
                <div className="flex flex-col m-auto w-80">
                    <h1 className="text-2xl mb-6 font-medium">Login</h1>
                    <form onSubmit={submitForm}>
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="username"
                                name="floating_username"
                                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Username
                            </label>
                        </div>
                        <div className="relative z-0 mb-2 w-full group">
                            <input
                                type="password"
                                name="floating_password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="floating_password"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>
                        </div>
                        <div className="form-control my-4">
                            <label className="cursor-pointer label flex justify-start">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm mr-4"
                                    id="agreement"
                                    checked={agreement}
                                    onChange={(e) => serAgreement(e.target.checked)}
                                    required
                                />
                                <label htmlFor="agreement" className="label-text">
                                    I agree the terms and conditions.
                                </label>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
