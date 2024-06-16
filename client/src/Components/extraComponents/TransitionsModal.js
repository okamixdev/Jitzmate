import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Post } from '../Post';
import Auth from '../../Utils/auth';
import { NakedPost } from '../NakedPost';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: '#ff5858',
    'background-image': 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: "none",
    'border-radius': 10
};

export const TransitionsModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div onClick={handleOpen}>
                <NakedPost postImage={`${props.file}`} />
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Post
                            avatar='https://www.shutterstock.com/image-vector/user-profile-icon-trendy-flat-260nw-1923506948.jpg'
                            postImage='https://media.gettyimages.com/id/1401887026/photo/asian-man-practicing-brazilian-jujutsu-closeup-of-hand-holding-belt.jpg?s=2048x2048&w=gi&k=20&c=qBLR4wtKXyu8Lh9Hj2JhrbmlQbjVLlyt1IBIok4hAqw='
                            caption={props.text}
                            postId={props._id}
                            file={props.file}
                            userID={Auth.getProfile().data._id}
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}