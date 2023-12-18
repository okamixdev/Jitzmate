import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { FIND_COMMENT } from '../Utils/queries'
import { Comment } from './Comment';



export const Post = (props) => {

    const ID = props.postId;
    const [commentData, setCommentData] = useState({});
    const { loading, error, data } = useQuery(FIND_COMMENT, { variables: { postId: ID }, });
    useEffect(() => {
        if (data) {
            setCommentData(data)
        }
    })

    return (
        <div className='card-container'>
            <div className='card-user-info'>
                <img src={props.avatar}></img>
                <h3>{props.username}</h3>
            </div>

            <img src={props.postImage}></img>
            <div className='caption'>
                <h2>{props.caption}</h2>
                <div className='like-comment'>
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-regular fa-comment"></i>
                </div>
            </div>

            <div className='comment-container'>
                {commentData.findComments?.map(comments => {
                    return (
                        <div>
                            <Comment text={comments.comment} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
