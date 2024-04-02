import { useState, useEffect } from "react";
import { getComments } from "../../services/comments";
import { Comment } from "./Comment.jsx"

const Comments = (props) => {
    const [backEndComments, setBackEndComments] = useState([])
    
    useEffect(() => {
            getComments(props.token, props.parent._id).then((data) => {
                setBackEndComments(data.comments)
            });
    }, [props.token, props.parent._id]);

    return ( 
        <div className="comments">
                <p>{backEndComments.length} Comments:</p>
                {props.showComments && backEndComments.map((comment) => {
                    if (comment.parentID == props.parent._id) {
                        return (
                        <>
                        <Comment key={comment._id} comment={comment} />
                        </>
                    )}
                })}
        </div>
    )};

    
export default Comments;
