
import { useState } from "react";

const PostForm = (props) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handlePost = async () => {
        try {
            await props.handleNewPost(text);
            console.log("Creating new post...")
            setText('');
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <>
            <textarea name="text-area" placeholder="What's on your mind?" value={text} onChange={handleChange}></textarea>
            <button role = "post-button" onClick={handlePost}>Post!</button>
        </>
    )
};

export default PostForm;