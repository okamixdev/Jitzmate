import React, { useState, useEffect } from 'react'
import { Post } from '../Post';
import { useQuery, useMutation } from '@apollo/client';
import { FEED } from '../../Utils/queries';
import Auth from '../../Utils/auth';



export const Home = () => {

    const { loading, data } = useQuery(FEED);
    const [feedData, setFeedData] = useState({});

    useEffect(() => {
        if (data) {
            setFeedData(data);
        }
    }, [data])

    return (
        <div className='feed-container'>

            {feedData.feed?.map(post => {

                return (
                    <Post
                        username='demoUser'
                        avatar='https://www.shutterstock.com/image-vector/user-profile-icon-trendy-flat-260nw-1923506948.jpg'
                        postImage='https://media.gettyimages.com/id/1401887026/photo/asian-man-practicing-brazilian-jujutsu-closeup-of-hand-holding-belt.jpg?s=2048x2048&w=gi&k=20&c=qBLR4wtKXyu8Lh9Hj2JhrbmlQbjVLlyt1IBIok4hAqw='
                        caption={post.text}
                        postId={post._id}
                        userID={Auth.getProfile().data._id}
                    />
                )


            })}




        </div>
    )
}
