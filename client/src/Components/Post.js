import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { FIND_COMMENT } from '../Utils/queries'
import { ADD_LIKE } from '../Utils/mutations'
import { REMOVE_LIKE } from '../Utils/mutations';
import { Comment } from './Comment';
import { FIND_POST } from '../Utils/queries';
import axios from 'axios'
import Auth from '../Utils/auth';
import { NavLink, Routes, BrowserRouter, Route } from 'react-router-dom';
import { OUser } from './pages/OUser';



export const Post = (props) => {

    const ID = props.postId;
    const [commentData, setCommentData] = useState({});
    const { loading, error, data } = useQuery(FIND_COMMENT, { variables: { postId: ID }, });

    const postData = useQuery(FIND_POST, { variables: { username: props.postId } });

    const [like] = useMutation(ADD_LIKE, { refetchQueries: [FIND_POST] });
    const [liked, setLiked] = useState(false);

    const [dislike] = useMutation(REMOVE_LIKE, { refetchQueries: [FIND_POST] });

    const [commentToggle, setCommentToggle] = useState(false);

    useEffect(() => {
        if (data) {
            setCommentData(data)
        }
    })

    let commentClass;

    if (commentToggle) {
        commentClass = 'show';
    }
    else {
        commentClass = 'hide';
    }

    const handleLike = async (e) => {
        e.preventDefault();

        try {
            const { data } = await like({
                variables: { post: props.postId }
            })
            setLiked(true);
        } catch (err) {
            console.log(err)
        }
    }

    const handleDislike = async (e) => {
        e.preventDefault();

        try {
            await dislike({
                variables: { postId: props.postId }
            })
        } catch (err) {
            console.log(err)
        }
        setLiked(false);
    }

    const imgSource = `http://localhost:3001/api/post/getImage/${ID}`;

    return (
        <>
            <div className='card-container'>
                <div className='card-user-info'>
                    <img src={props.avatar}></img>
                    <NavLink className='noStyle' to="/ouser" state={{ postID: `${ID}`, user: `${postData.data?.findPosts[0].user._id}` }} ><h3>{postData.data?.findPosts[0].user.username}</h3></NavLink>
                </div>

                <div className='post-image'>
                    <img src={imgSource}></img>
                </div>
                <div className='caption'>
                    <h2>{props.caption}</h2>
                    <div className='like-comment'>
                        {postData.data?.findPosts[0].likes.find((element) => element._id === props.userID) ?

                            (

                                <>
                                    <i class="fa-solid fa-heart b-activate" onClick={handleDislike}></i>
                                </>
                            )
                            :
                            (
                                <>
                                    <i className="fa-regular fa-heart boton b-activate" onClick={handleLike}></i>
                                </>
                            )
                        }
                        <div className='count b-activate'>{postData.data?.findPosts[0].likeCount}</div>

                        <i className="fa-regular fa-comment boton b-activate" onClick={() => setCommentToggle(!commentToggle)}></i>
                    </div>
                </div>

                {/* style={{ display: `${commentClass}` }} */}
                <div className={`comment-container ${commentClass}`}>
                    {commentData.findComments?.map(comments => {
                        return (
                            <div>
                                <Comment username={comments.user.username} text={comments.comment} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
