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
    return (
        <div id="like-button-container">
        <p>{count}</p>
        <button onClick={like}><FontAwesomeIcon icon={faThumbsUp} /></button>
        {count >= 1 && <button onClick={dislike}><FontAwesomeIcon icon={faThumbsDown} /></button>}
        </div>
    )
}

export default LikeDisplay;