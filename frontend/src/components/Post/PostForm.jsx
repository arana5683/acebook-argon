
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
            let formData = new FormData();
            formData.append('message', text);
            if (file) {
                formData.append('image', file);
            }
            console.log('formData',formData, 'text', text)
            await props.handleNewPost(formData);
            console.log("Creating new post...")
            console.log(file)
            setText('');
            setFile(null);
        } catch (err) {
            console.error(err)
        }
        
    };
    // resets the state to its value

    return (
        <>
            <form onSubmit={(event) => { event.preventDefault(); handlePost(); }}>
            <textarea name="text-area" placeholder="What's on your mind?" value={text} onChange={handleChange}></textarea>
            <input label="test" type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit" role="post-button">Post!</button>
        </form>
            
        </>
    )
};

export default PostForm;

