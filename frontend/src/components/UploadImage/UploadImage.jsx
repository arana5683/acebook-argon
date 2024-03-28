import { useState } from "react";


export default function ShareImage() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("file", file, fileName);
    
        try {
            await fetch.post("/api/controllers/uploadImage", data);
            console.log("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
        
    return (
        <div className="share-image">
            <form action="/" method="POST" encType="multipart/form-data">
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Share Image</button>
            </form>
        </div>
        );
    }
        