
import { useState } from "react";

const PostForm = (props) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

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

