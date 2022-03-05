import React from 'react'

interface InputGroupProps {
    type: string
    value: string
    error: string | undefined
    typeName: string
    floatingType: string
    inputLabel: string
    setValue: (str: string) => void
}

const InputGroup: React.FC<InputGroupProps> = ({ error, setValue, type, value, floatingType, inputLabel }) => {
    return (
        <div className="relative z-0 mb-4 w-full group">
            <input
                type={type}
                name={floatingType}
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <label
                htmlFor={floatingType}
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {inputLabel}
            </label>
            <small className="text-red-500">{error}</small>
        </div>
    )
}

export default InputGroup