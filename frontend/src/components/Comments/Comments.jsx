import { useState, useEffect } from "react";
import { getComments } from "../../services/comments";
import { postNewComment } from "../../services/comments";
import { Comment } from "./Comment.jsx"
import CommentForm from "./CommentForm.jsx"

const Comments = (props) => {
    const [backEndComments, setBackEndComments] = useState([])
    
    const handleNewComment = (text) => {
        if (text.trim() !== '') {
            const formattedText = `{"body": "${text}", "parentId": "${props.parent._id}"}`
            postNewComment(props.token, JSON.parse(formattedText));
            getComments(props.token, props.parent._id).then((data) => {
                setBackEndComments(data.comments)
            });
        }
    };

    useEffect(() => {
            getComments(props.token, props.parent._id).then((data) => {
                setBackEndComments(data.comments)
            });
    }, [props.token, props.parent._id]);

    return ( 
        <div className="comments">
                <CommentForm handleNewComment={handleNewComment}/>
                <p>{backEndComments.length} Comments:</p>
                {props.showComments && backEndComments.map((comment) => {
                    return (
                    <>
                    <Comment key={comment._id} comment={comment} />
                    </>
                    )
                })}
        </div>
    )};

    
export default Comments;
