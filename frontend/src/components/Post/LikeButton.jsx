// import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
// import { updatePostLikesArr } from "../../services/posts";

// const LikeDisplay = ({ postId }) => {
//     const [likeState, setLikeState] = useState(() => {
    
//         const storedLikeState = localStorage.getItem(`likeState_${postId}`);
//         return storedLikeState === 'liked';
//     });

//     const updateLikes = async () => {
//         const token = localStorage.getItem("token");
//         const userId = localStorage.getItem('userId');
//         const likeDetails = { postId, userId };

//         try {
//             const response = await updatePostLikesArr(token, likeDetails);

//             if (response === "The post has been liked") {
//                 setLikeState(true);

//                 localStorage.setItem(`likeState_${postId}`, 'liked');
//             } else if (response === "The post has been disliked") {
//                 setLikeState(false);

//                 localStorage.setItem(`likeState_${postId}`, 'disliked');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div id="like-button-container">
//             <p role="like-counter"></p>
//             <button role="like-button" style={{ margin: '5px 5px' }} onClick={updateLikes} alt="like-icon">
//                 <FontAwesomeIcon icon={likeState ? faThumbsDown : faThumbsUp} />
//             </button>
//         </div>
//     );
// }

// export default LikeDisplay;

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { updatePostLikesArr, getPostLikes } from "../../services/posts";
// import { get } from "../../../../api/routes/posts";

const LikeDisplay = ({ postId }) => {
    const [likeState, setLikeState] = useState(false); // Initialize like state to false by default

    const [likeCounter, setLikeCounter] = useState(0)

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('userId') !== null;

        // Initialize like state based on user login status
        if (isLoggedIn) {
            // Retrieve like state from localStorage
            const storedLikeState = localStorage.getItem(`likeState_${postId}`);
            setLikeState(storedLikeState === 'liked');
        } else {
            // If user is not logged in, initialize like state to false (thumbs up)
            setLikeState(false);
        }

    }, [postId]);

    const getLikeCount = async () => {
        const token = localStorage.getItem("token");
        console.log(postId)
        try {
            const likesArray = await getPostLikes(token, postId);
            console.log(typeof likesArray)
            setLikeCounter(likesArray.length);
            console.log(likeCounter)
        } catch (error) {
            console.error('Error with likes', error);
        }
    };

    const updateLikes = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');
        const likeDetails = { postId, userId };

        try {
            const response = await updatePostLikesArr(token, likeDetails);

            // Update like state based on response
            if (response === "The post has been liked") {
                setLikeState(true);
                localStorage.setItem(`likeState_${postId}`, 'liked');
            } else if (response === "The post has been disliked") {
                setLikeState(false);
                localStorage.setItem(`likeState_${postId}`, 'disliked');
            }
            getLikeCount();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div id="like-button-container">
            <p role="like-counter">{likeCounter}</p>
            <button role="like-button" style={{ margin: '5px 5px' }} onClick={updateLikes} alt="like-icon">
                <FontAwesomeIcon icon={likeState ? faThumbsUp : faThumbsDown} />
            </button>
        </div>
    );
}

export default LikeDisplay;
