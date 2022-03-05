import Axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import InputGroup from "./components/InputGroup";

const Register: NextPage = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [agreement, serAgreement] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const router = useRouter();

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

        if (!agreement) {
            setErrors({ ...errors, agreement: "You must agree to T&C" });
            return;
        }

        try {
            await Axios.post("/auth/register", {
                username,
                email,
                password,
            });

            router.push("/login");
        } catch (err) {
            setErrors(err.response.data);
        }
    };

    return (
        <div>
            <Head>
                <title>Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex justify-center items-center h-screen flex-col">
                <div className="flex flex-col m-auto w-80">
                    <h1 className="text-2xl mb-6 font-medium">Sign Up</h1>
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
                            inputLabel="Email"
                            floatingType="floating_email"
                            type="email"
                            typeName="floating_email"
                            value={email}
                            setValue={setEmail}
                            error={errors.email}
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
                            <p className="text-xs">Already a member?</p>
                            <Link href="/login">
                                <a className="ml-1 uppercase text-xs underline font-medium">
                                    log in
                                </a>
                            </Link>
                        </div>
                        <div className="form-control my-2">
                            <label className="cursor-pointer label flex justify-start">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm mr-4"
                                    id="agreement"
                                    checked={agreement}
                                    onChange={(e) => serAgreement(e.target.checked)}
                                />
                                <label htmlFor="agreement" className="label-text">
                                    I agree the terms and conditions.
                                </label>
                            </label>
                            <small className="text-red-500">{errors.agreement}</small>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
