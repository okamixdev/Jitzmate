import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { FIND_COMMENT } from '../Utils/queries'
import { ADD_LIKE } from '../Utils/mutations'
import { Comment } from './Comment';
import { FIND_POST } from '../Utils/queries';



export const Post = (props) => {

    const ID = props.postId;
    const [commentData, setCommentData] = useState({});
    const { loading, error, data } = useQuery(FIND_COMMENT, { variables: { postId: ID }, });

    const postData = useQuery(FIND_POST, { variables: { username: props.postId } });

    const [like] = useMutation(ADD_LIKE);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (data) {
            setCommentData(data)
        }
    })


    const handleLike = async (e) => {
        e.preventDefault();

        try {
            const { data } = await like({
                variables: { post: props.postId }
            })
        } catch (err) {
            console.log(err)
        }
    }

    // const handleDislike = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await like({
    //             variables: { post: ID }
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    console.log(postData.data)

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
                    {/* {postData.data.findPosts.likes.find((element) => element == props.userID) ?
                        (
                            <>
                                <i class="fa-solid fa-heart"></i>
                            </>
                        )
                        :
                        (
                            <>
                                <i className="fa-regular fa-heart boton b-activate" onClick={handleLike}></i>
                            </>
                        )
                    } */}

                    <i className="fa-regular fa-comment boton b-activate"></i>
                </div>
            </div>

            <div className='comment-container'>
                {commentData.findComments?.map(comments => {
                    return (
                        <div>
                            <Comment username={comments.user.username} text={comments.comment} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
