import { useState, useEffect } from "react";
import { getComments } from "../../services/comments";

const Comments = (props) => {
    const [backEndComments, setBackEndComments] = useState([])
    
    useEffect(() => {
            getComments(props.token).then((data) => {
                setBackEndComments([data.comments])
            });
    }, [props.token]);
    
    return ( 
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            {backEndComments.filter((comment) => {
                console.log()
                if (comment.parentID == props.post._id) {
                    return <h5 className="comment" key="comment">{comment}</h5>
                }
            })}
        </div>
    );
};

export default Comments; 