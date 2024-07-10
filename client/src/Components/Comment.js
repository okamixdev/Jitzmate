import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';

const paragraphStyle = {
    WebkitLineClamp: '2',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
}


export const Comment = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const [showReadMore, setShowReadMore] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        // if (ref.current) {
        //     setShowReadMore(ref.current.scrollHeight !== ref.current.clientHeight);
        // }
        if (props.text.length > 90) {
            setShowReadMore(true)
        } else (
            setShowReadMore(false)
        )
    }, [])

    // console.log(props.open)
    // console.log(showReadMore)
    // console.log(props.text.length)
    return (
        <div style={props.open ? { display: 'block' } : { display: 'none' }} className=''>
            <div className='comment-info'>
                <h2 className='u-name'> <NavLink className='u-name' to="/ouser" state={{ user: `${props.id}` }} >{props.username}</NavLink></h2>
                <p style={isOpen ? null : paragraphStyle} ref={ref}>{props.text}</p>
                {showReadMore && (
                    <button className='read-more' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <i class="fa-solid fa-sort-up"></i> : <i class="fa-solid fa-sort-down"></i>}
                    </button>
                )}
                
            </div>
        </div>
    )
}
