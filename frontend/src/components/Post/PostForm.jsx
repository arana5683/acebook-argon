
import { useState } from "react";

const PostForm = (props) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handlePost = () => {
        props.handleNewPost(text);
        setText('');
    }

    return(
        <>
            <textarea name="text-area" placeholder="What's on your mind?" value={text} onChange={handleChange}></textarea>
            <button role = "post-button" onClick={handlePost}>Post!</button>
        </>
    )
};

export default PostForm;