import Axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import InputGroup from "./components/InputGroup";

const Register: NextPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<any>({});
    const router = useRouter();

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await Axios.post("/auth/login", {
                username,
                password,
            });

            router.push("/");
        } catch (err) {
            setErrors(err.response.data);
        }
    };

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>

            <div className="flex justify-center items-center h-screen flex-col">
                <div className="flex flex-col m-auto w-80">
                    <h1 className="text-2xl mb-6 font-medium">Login</h1>
                    <form onSubmit={submitForm}>
                        <InputGroup
                            inputLabel="Username"
                            floatingType="floating_username"
                            type="username"
                            typeName="floating_username"
                            value={username}
                            setValue={setUsername}
                            error={errors.username}
                        />
                        <InputGroup
                            inputLabel="Password"
                            floatingType="floating_password"
                            type="password"
                            typeName="floating_password"
                            value={password}
                            setValue={setPassword}
                            error={errors.password}
                        />
                        <div className="flex justify-end">
                            <p className="text-xs">New User?</p>
                            <Link href="/register">
                                <a className="ml-1 uppercase text-xs underline font-medium">
                                    sign up
                                </a>
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
