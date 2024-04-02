import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const LikeDisplay = () => {
    const [count, setCount] = useState(0)

    const like = () => {
        setCount(count + 1);
    }

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