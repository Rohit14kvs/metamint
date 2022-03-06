import Axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { Post } from '../types'
import dayJs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

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
            <div key={post.indentifier} className='flex mb-4 bg-neutral rounded'>
              <div className="w-10 text-center bg-gray-600 rounedd-l">
                <p>V</p>
              </div>
              <div className="w-full p-2">
                <div className="flex items-center mb-2">
                  <Link href={`c/${post.subName}`} passHref>
                    <Fragment>
                      <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="" className='h-6 w-6 mr-1 rounded-full cursor-pointer' />
                      <a className='text-xs font-bold hover:underline cursor-pointer'>
                        /c/{post.subName}
                      </a>
                    </Fragment>
                  </Link>
                  <div className="text-xs"><span className='mx-1'>|</span> Posted by
                    <Link href={`/m/${post.username}`}>
                      <a className='mx-1 hover:underline'>
                        /m/{post.username}
                      </a>
                    </Link>
                    <Link href={`/c/${post.url}`}>
                      <a className='mx-1 hover:underline'>{dayJs(post.createdAt).fromNow()}</a>
                    </Link>
                  </div>
                </div>
                <Link href={post.url}>
                  <a className='ml-1 text-lg font-medium'>{post.title}</a>
                </Link>
                {post.body && <p className='ml-1 mt-1 mb-2 text-sm'>{post.body}</p>}
                <div className="flex">
                  <Link href={post.url}>
                    <a>
                      <div className='text-gray-300 px-1 mr-1 rounded cursor-pointer hover:bg-gray-400 text-xs'>
                        <i className="fa-solid fa-message fa-xs mr-1"></i>
                        <span className='font-semibold'>20 Comments</span>
                      </div>
                    </a>
                  </Link>
                  <div className='text-gray-300 px-1 mr-1 rounded cursor-pointer hover:bg-gray-400 text-xs'>
                    <i className="fa-solid fa-share-nodes fa-xs mr-1"></i>
                    <span className='font-semibold'>Share</span>
                  </div>
                  <div className='text-gray-300 px-1 rounded cursor-pointer hover:bg-gray-400 text-xs'>
                    <i className="fa-solid fa-bookmark fa-xs mr-1"></i>
                    <span className='font-semibold'>Save</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home
