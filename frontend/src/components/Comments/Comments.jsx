import { useState, useEffect } from "react";
import { getComments } from "../../services/comments";
import { postNewComment } from "../../services/comments";
import { Comment } from "./Comment.jsx"
import CommentForm from "./CommentForm.jsx"

const Comments = (props) => {
    const [backEndComments, setBackEndComments] = useState([])
    
    const handleNewComment = async (text) => {
        if (text.trim() !== '') {
            const formattedText = `{"body": "${text}", "parentId": "${props.parent._id}"}`
            await postNewComment(props.token, JSON.parse(formattedText));
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
        <div className="Comments">
                <CommentForm handleNewComment={handleNewComment}/>
                <p>{backEndComments.length} Comments:</p>
                {console.log(backEndComments.reverse())}
                {props.showComments && backEndComments.slice().reverse().map((comment) => {
                    return (
                    <>
                    <Comment key={comment._id} comment={comment} />
                    </>
                    )
                })}
        </div>
    )};

    
export default Comments;
