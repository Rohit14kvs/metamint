import Axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { Post } from '../types'
import dayJs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PostCard from './components/PostCard'

dayJs.extend(relativeTime)

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    Axios.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Head>
        <title>Metamint: Explore here</title>
      </Head>
      <div className="container pt-4 flex">
        <div className="w-2/3">
          {posts.map(post => (
            <PostCard post={post} key={post.indentifier} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home
