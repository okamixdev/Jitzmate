import React from 'react'

export const NakedPost = (props) => {
    return (
        <div className='naked-post'>
            <img src={props.postImage}></img>
        </div>
    )
}
