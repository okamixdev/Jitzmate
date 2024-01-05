import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { FIND_POST } from '../../Utils/queries';
import { ADD_LIKE } from '../../Utils/mutations'
import { REMOVE_LIKE } from '../../Utils/mutations';
import { FIND_USER } from '../../Utils/queries';
import { NakedPost } from '../NakedPost';


export const OUser = () => {

    const location = useLocation();
    const ID = location.state.postID;



    const postData = useQuery(FIND_POST, { variables: { username: location.state.postID } });
    const imgSource = ``;

    const userData = useQuery(FIND_USER, { variables: { userId: location.state.user } })

    const [like] = useMutation(ADD_LIKE, { refetchQueries: [FIND_POST] });
    const [liked, setLiked] = useState(false);

    const [dislike] = useMutation(REMOVE_LIKE, { refetchQueries: [FIND_POST] });


    return (
        <div className='osuer-info-div'>

            <div className='ouser-feed-container'>
                <div className='ouser-info'>
                    <div className='ouser-img'>
                        <div className='ouser-username'>{userData.data?.findUser.username}</div>
                        <img className='ouser-avatar' src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
                    </div>

                    <div className='follow-container'>
                        <div className='osuer-follows'>
                            <div className='follow-info'><h2>{userData.data?.findUser.followersCount}</h2><h3>Followers</h3></div>
                            <div className='follow-info'><h2>{userData.data?.findUser.followsCount}</h2><h3>Following</h3></div>
                            <div className='follow-info'><h2>{userData.data?.findUser.postsCount}</h2><h3>Posts</h3></div>
                        </div>
                        <button>FOLLOW</button>
                    </div>
                </div>

                <div className='ouser-description'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

                <div className='ouser-feed'>
                    {userData.data?.findUser.posts?.map(post => {
                        return (
                            <div>
                                <NakedPost postImage={`http://localhost:3001/api/post/getImage/${post._id}`} />
                            </div>
                        )
                    })}
                </div>



            </div>





        </div>
    )
}
