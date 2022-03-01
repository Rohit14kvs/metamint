import type { NextPage } from 'next'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'

const Home: NextPage = () => {
  return (
    <div >
      {/* <Register /> */}
      <Login />
      <Footer />
    </div>
  )
}

export default Home
