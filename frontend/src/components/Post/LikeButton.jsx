import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LikeDisplay = () => {
    const [count, setCount] = useState(0)

    const like = async () => {
        try {
        const response = await fetch(`${BACKEND_URL}/posts/getPostId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log('Post ID:', data.postId);
        } catch (error) {
          console.error('Error:', error);
        }
      };
        // setCount(count + 1);

    

    const dislike = () => {
        setCount(count - 1);
    }

    // add an event listener for this button to get user id and make a put method request to backend
    // something like handlelike
    return (
        <div id="like-button-container">
        <p role="like-counter">{count}</p>
        <button role="like-button"style={{ margin: '5px 5px' }}onClick={like} alt="like-icon"><FontAwesomeIcon icon={faThumbsUp} /></button>
        {count >= 1 && <button role="dislike-button" onClick={dislike} alt="dislike-icon"><FontAwesomeIcon icon={faThumbsDown} /></button>}
        </div>
    )
}

export default LikeDisplay;

// const handleLikeButtonClick = async () => {
//     try {
//       const response = await fetch('/posts/like', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         // Optionally, you can send data with the request
//         body: JSON.stringify({
//           // Add any data needed for the backend to identify the post
//         })
//       });
//       const data = await response.json();
//       console.log('Post ID:', data.postId);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   // In your JSX, attach the event handler to the like button
//   <button onClick={handleLikeButtonClick}>Like</button>