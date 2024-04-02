import { useState, useEffect } from "react";
import { getComments } from "../../services/comments";
import { Comment } from "./Comment.jsx"

const Comments = (props) => {
    const [backEndComments, setBackEndComments] = useState([])
    
    useEffect(() => {
            getComments(props.token).then((data) => {
                setBackEndComments(data.comments)
            });
    }, [props.token]);

    return ( 
        <div className="comments">
                <p>Comments:</p>
                {props.showComments && backEndComments.map((comment) => {
                    if (comment.parentID == props.post._id) {
                        return (
                        <>
                        <Comment key={comment._id} comment={comment} />
                        </>
                    )}
                })};
        </div>
    )};

    
export default Comments;
