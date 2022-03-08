import Link from 'next/link'
import React, { Fragment, HtmlHTMLAttributes } from 'react'
import { Post } from '../../types'
import dayJs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { HtmlProps } from 'next/dist/shared/lib/utils'

dayJs.extend(relativeTime)

const ActionButtons = ({ children }: HtmlHTMLAttributes<HtmlProps>) => {
    return <div className='text-gray-300 px-1 rounded cursor-pointer hover:bg-gray-700 text-xs'>{children}</div>
}


interface Props {
    post: Post
}

const PostCard = ({ post }: Props) => {
    return (
        <div key={post.indentifier} className='flex mb-4 bg-neutral rounded'>
            <div className="w-10 text-center bg-gray-600 rounedd-l">
                <p>V</p>
            </div>
            <div className="w-full p-2">
                <div className="flex items-center mb-2">
                    <Link href={`c/${post.subName}`} passHref>
                        <Fragment>
                            <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="" className='h-6 w-6 mr-1 rounded-full cursor-pointer' />
                            <a className='text-xs font-bold hover:underline cursor-pointer text-slate-300'>
                                /c/{post.subName}
                            </a>
                        </Fragment>
                    </Link>
                    <div className="text-xs"><span className='ml-1 text-slate-300'>|</span> Posted by
                        <Link href={`/m/${post.username}`}>
                            <a className='hover:underline text-slate-300 pl-1'>
                                /m/{post.username}
                            </a>
                        </Link>
                        <Link href={`/c/${post.url}`}>
                            <a className='mx-1 hover:underline text-slate-500'>{dayJs(post.createdAt).fromNow()}</a>
                        </Link>
                    </div>
                </div>
                <Link href={post.url}>
                    <a className='ml-1 text-lg font-medium text-slate-300'>{post.title}</a>
                </Link>
                {post.body && <p className='ml-1 mt-1 mb-2 text-sm text-slate-300'>{post.body}</p>}
                <div className="flex text-slate-300">
                    <Link href={post.url}>
                        <a>
                            <ActionButtons>
                                <i className="fa-solid fa-message fa-xs mr-1 text-slate-400"></i>
                                <span className='font-semibold'>20 Comments</span>
                            </ActionButtons>
                        </a>
                    </Link>
                    <ActionButtons>
                        <i className="fa-solid fa-share-nodes fa-xs mr-1 text-slate-400"></i>
                        <span className='font-semibold'>Share</span>
                    </ActionButtons>
                    <ActionButtons>
                        <i className="fa-solid fa-bookmark fa-xs mr-1 text-slate-400"></i>
                        <span className='font-semibold text-slate-400'>Save</span>
                    </ActionButtons>
                </div>
            </div>
        </div>
    )
}

export default PostCard