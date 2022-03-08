import Link from "next/link";
import React, { Fragment, HtmlHTMLAttributes } from "react";
import { Post } from "../../types";
import dayJs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HtmlProps } from "next/dist/shared/lib/utils";
import Axios from "axios";
import classNames from 'classnames';

dayJs.extend(relativeTime);

const ActionButtons = ({ children }: HtmlHTMLAttributes<HtmlProps>) => {
    return (
        <div className="text-gray-300 px-1 rounded cursor-pointer hover:bg-gray-700 text-xs">
            {children}
        </div>
    );
};

interface Props {
    post: Post;
    key: string;
}

const PostCard = ({ post: { identifier, slug, title, body, createdAt, subName, voteScore, userVote, url, username, commentCount } }: Props) => {
    const PostLink = ({ children }: HtmlHTMLAttributes<HtmlProps>) => {
        return <Link href={`c/${subName}`}>{children}</Link>;
    };

    const vote = async (value: number) => {
        try {
            const res = await Axios.post('/misc/vote', {
                identifier, slug, value
            })
            console.log(identifier);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div key={identifier} className="flex mb-4 bg-neutral rounded">
            <div className="w-10 text-center bg-gray-600 rounedd-l flex flex-col items-center justify-center">
                <div className="w-6 mx-auto rounded cursor-pointer hover:text-green-500 hover:bg-gray-700" onClick={() => vote(1)}>
                    <i className={classNames("icon-arrow-up", {
                        'text-green-500': userVote === 1
                    })}></i>
                </div>
                <p className="font-semibold">{voteScore}</p>
                <div className="w-6 mx-auto rounded cursor-pointer hover:text-red-500 hover:bg-gray-700" onClick={() => vote(-1)}>
                    <i className={classNames("icon-arrow-down", {
                        ' text-red-500': userVote === -1
                    })}></i>
                </div>
            </div>
            <div className="w-full p-2">
                <div className="flex items-center mb-2">
                    <PostLink>
                        <a>
                            <img
                                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                alt={username}
                                className="h-6 w-6 mr-1 rounded-full cursor-pointer"
                            />
                        </a>
                    </PostLink>
                    <PostLink>
                        <a className="text-xs font-bold hover:underline cursor-pointer text-slate-300">
                            /c/{subName}
                        </a>
                    </PostLink>
                    <div className="text-xs">
                        <span className="ml-1 text-slate-300">|</span> Posted by
                        <Link href={`/m/${username}`}>
                            <a className="hover:underline text-slate-300 pl-1">
                                /m/{username}
                            </a>
                        </Link>
                        <span className="mx-1 text-slate-500">
                            {dayJs(createdAt).fromNow()}
                        </span>
                    </div>
                </div>
                <Link href={url}>
                    <a className="ml-1 text-lg font-medium text-slate-300">
                        {title}
                    </a>
                </Link>
                {body && (
                    <p className="ml-1 mt-1 mb-2 text-sm text-slate-300">{body}</p>
                )}
                <div className="flex">
                    <Link href={url}>
                        <a>
                            <ActionButtons>
                                <i className="fa-solid fa-message fa-xs mr-1 text-slate-400"></i>
                                <span className="font-semibold text-slate-400">{commentCount} Comments</span>
                            </ActionButtons>
                        </a>
                    </Link>
                    <ActionButtons>
                        <i className="fa-solid fa-share-nodes fa-xs mr-1 text-slate-400"></i>
                        <span className="font-semibold text-slate-400">Share</span>
                    </ActionButtons>
                    <ActionButtons>
                        <i className="fa-solid fa-bookmark fa-xs mr-1 text-slate-400"></i>
                        <span className="font-semibold text-slate-400">Save</span>
                    </ActionButtons>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
