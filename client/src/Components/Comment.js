import React from 'react'

export const Comment = (props) => {
    return (
        <div className=''>
            <div className='comment-info'>
                <p className='u-name'>{props.username}</p>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
