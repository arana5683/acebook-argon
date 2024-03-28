import { useState, useEffect } from "react";
import { getComments } from "../../services/comments";

const Comments = (props) => {
    const [backEndComments, setBackEndComments] = useState([])
    
    useEffect(() => {
            getComments(props.token).then((data) => {
                setBackEndComments(data.comments)
            });
    }, [props.token]);

    return ( 
        <div className="comments">
                {backEndComments.map((comment) => {
                    if (comment.parentID == props.post._id) {
                        return <h5 key={comment._id}>{comment.body}</h5>}
                })}
        </div>
    )}

export default Comments;
