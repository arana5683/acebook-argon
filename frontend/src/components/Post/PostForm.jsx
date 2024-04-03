
import { useState } from "react";

const PostForm = (props) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    // initialises file and sets it as null to indicate no file selected 

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    // this is triggered when user selects a file - updates file state - event.target.files 
    // represents files selected - [0] is first file.

    const handlePost = async () => {

        
        try {
            await props.handleNewPost(text, file);
            console.log("Creating new post...")
            setText('');
            setFile(null);
        } catch (err) {
            console.error(err)
        }
        
    };
    // resets the state to its value

    return(
        <>
            <textarea name="text-area" placeholder="What's on your mind?" value={text} onChange={handleChange}></textarea>
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
            <button role = "post-button" onClick={handlePost}>Post!</button>
        </>
    )
};

export default PostForm;