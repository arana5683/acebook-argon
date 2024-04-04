
import { useState } from "react";

const CommentForm = (props) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleComment = () => {
        props.handleNewComment(text);
        setText('');
    }

    return(
        <>
            <textarea name="text-area" placeholder="Leave a Comment" value={text} onChange={handleChange}></textarea>
            <br></br>
            <br></br>
            <button role = "post-button" onClick={handleComment}>Submit</button>
        </>
    )
};

export default CommentForm; 

