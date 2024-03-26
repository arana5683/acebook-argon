
import { useState } from "react";
import { postNewPost } from "../../services/posts";


const PostForm = (props) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handlePost = () => {
        if (text.trim() !== '') {
            console.log(typeof text)
            const formattedText = `{"message": "${text}"}`
            postNewPost(props.token, formattedText);
            setText('')
        }
    };

    return(
        <>
            <textarea placeholder="What's on your mind?" value={text} onChange={handleChange}></textarea>
            <button onClick={handlePost}>Post!</button>
        </>
    )
};

export default PostForm;