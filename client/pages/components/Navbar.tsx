import Image from 'next/image'
import React from 'react'


const Navbar = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content flex justify-between">
            <a className="btn btn-ghost normal-case text-xl">Metamint</a>

            <div className="">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered h-10" />
                </div>
            </div>
            <div>
                <button
                    className="text-blue-700 bg-transparent focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
                >
                    Sign Up
                </button>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Navbar