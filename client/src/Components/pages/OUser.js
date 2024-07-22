import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { FIND_USER } from '../../Utils/queries';
import { TransitionsModal } from '../extraComponents/TransitionsModal';
import { ADD_FOLLOW } from '../../Utils/mutations';
import { REMOVE_FOLLOW } from '../../Utils/mutations';
import Auth from '../../Utils/auth';

export const OUser = (props) => {


    const location = useLocation();
    const ID = props._id || location.state.user;

    const userData = useQuery(FIND_USER, { variables: { userId: ID } })


    const [follow] = useMutation(ADD_FOLLOW, { refetchQueries: [FIND_USER] });
    const [unfollow] = useMutation(REMOVE_FOLLOW, { refetchQueries: [FIND_USER] });

    const handleFollow = async (e) => {
        e.preventDefault();

        const { data } = await follow({
            variables: { follows: userData.data?.findUser._id }
        })
    };

    const handleUnfollow = async (e) => {
        e.preventDefault();

        const { data } = await unfollow({
            variables: { followId: userData.data?.findUser._id }
        })
    };

    const handleAvatar = async (e) => {
        e.preventDefault();

        // const { data } = await unfollow({
        //     variables: { followId: userData.data?.findUser._id }
        // })

        console.log('avatar')

    };

    return (
        <div className='osuer-info-div'>

            <div className='ouser-cont'>
                <div className='ouser-feed-container'>
                    <div className='ouser-info'>
                        <div className='ouser-img'>
                            <div className='ouser-username'>{userData.data?.findUser.username}</div>
                            <img onClick={handleAvatar} className={`${ID === Auth.getProfile().data._id ? 'ouser-avatar-u' : 'ouser-avatar'}`} src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>

                            {ID === Auth.getProfile().data._id ?
                                (
                                    <>
                                        <i className="fa-solid fa-pen-to-square edit-text"></i>
                                    </>
                                ) :
                                (
                                    <>
                                    </>
                                )
                            }
                        </div>

                        <div className='follow-container'>
                            <div className='osuer-follows'>
                                <div className='follow-info'><h2>{userData.data?.findUser.followersCount}</h2><h3>followers</h3></div>
                                <div className='follow-info'><h2>{userData.data?.findUser.followsCount}</h2><h3>following</h3></div>
                                <div className='follow-info'><h2>{userData.data?.findUser.postsCount}</h2><h3>all posts</h3></div>
                            </div>

                            {ID === Auth.getProfile().data._id ?
                                (
                                    <>

                                    </>
                                ) :
                                (
                                    <>
                                        {userData.data?.findUser.followers?.find((element) => element._id === Auth.getProfile().data._id) ?
                                            (
                                                <>
                                                    <button className='follow-btn' onClick={handleUnfollow}>UNFOLLOW</button>
                                                </>
                                            ) :
                                            (
                                                <>
                                                    <button className='follow-btn' onClick={handleFollow}>FOLLOW</button>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }



                        </div>
                    </div>

                    <div className='ouser-description'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <div className='ouser-feed'>
                        {userData.data?.findUser.posts?.map(post => {
                            return (
                                <div>
                                    <TransitionsModal
                                        text={post.text}
                                        _id={post._id}
                                        file={post.file}
                                    />
                                </div>

                            )
                        })}
                    </div>



                </div>




            </div>
        </div>
    )
}
