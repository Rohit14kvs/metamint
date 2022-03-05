import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Metamint: Explore here</title>
      </Head>

      <div className="navbar bg-neutral text-neutral-content flex justify-between items-center">
        <Link href="/">
          <a className="btn normal-case text-lg">Metamint</a>
        </Link>
        <div className="pl-2 bg-gray-700 rounded-lg">
          <div className="flex items-center">
            <i className="fa-solid fa-magnifying-glass pr-1"></i>
            <input type="text" placeholder="Search" className="input px-2 h-8 focus:outline-none rounded-l-none pl-1 w-96" />
          </div>
        </div>
        <div className='flex'>
          <Link href="/login">
            <a className='px-8 py-1 border-2 text-sm rounded-md font-semibold hover:text-blue-500 hover:border-blue-500 transition-colors'>Login</a>
          </Link>
          <Link href="/register">
            <a className='px-8 py-1 border-2 border-blue-600 text-sm rounded-md bg-blue-600 font-semibold ml-4 hover:bg-blue-700 hover:border-blue-700 transition-colors'>Sign Up</a>
          </Link>
        </div>
      </div>
      <div>Home</div>
    </div>
  )
}

export default Home
