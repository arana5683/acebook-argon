
import { useState } from "react";
import { postNewPost } from "../../services/posts";


const PostForm = (props) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handlePost = () => {
        if (text.trim() !== '') {
            const formattedText = `{"message": "${text}"}`
            postNewPost(props.token, JSON.parse(formattedText));
            setText('')
        }
    };

    return(
        <>
            <textarea name="text-area" placeholder="What's on your mind?" value={text} onChange={handleChange}></textarea>
            <button role = "post-button" onClick={handlePost}>Post!</button>
        </>
    )
};

export default PostForm;