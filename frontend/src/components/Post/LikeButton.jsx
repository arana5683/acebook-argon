import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { updatePostLikesArr, checkLikeStatus, getPostLikes } from "../../services/posts";

const LikeDisplay = ({ postId }) => {
    const [likeState, setLikeState] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);

    const getLikeCount = async () => {
        const token = localStorage.getItem("token");
        try {
            const likesArray = await getPostLikes(token, postId);
            setLikeCounter(likesArray.length);
        } catch (error) {
            console.error('Error with likes', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');
        const fetchLikeStatus = async () => {
            if (!token || !userId) return;

            try {
                const response = await checkLikeStatus(token, { postId, userId });
                setLikeState(response.liked);
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };
        fetchLikeStatus();
        getLikeCount();
        
    });
    // we have deleted the dependency array from above line, if something breaks, try readding it to debug
    

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const postIdKey = `likeState_${userId}_${postId}`;
        const storedLikeState = localStorage.getItem(postIdKey);
        if (storedLikeState === 'liked') {
            setLikeState(true);
        } else if (storedLikeState === 'disliked') {
            setLikeState(false);
        }

    }, [postId]);

    

    const updateLikes = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');
        const postIdKey = `likeState_${userId}_${postId}`;
        try {
            const response = await updatePostLikesArr(token, { postId, userId });
            setLikeState(response === "The post has been liked");
            localStorage.setItem(postIdKey, response === "The post has been liked" ? 'liked' : 'disliked');
            getLikeCount();
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };


    return (
        <div id="like-button-container">
            <p role="like-counter">Likes: {likeCounter}</p>
            <button
                role="like-button"
                style={{ margin: '5px 5px' }}
                onClick={updateLikes}
                alt="like-icon"
            >
                <FontAwesomeIcon icon={likeState ? faThumbsDown : faThumbsUp} />
            </button>
        </div>
    );
}

export default LikeDisplay;