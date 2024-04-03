import LikeDisplay from "../Post/LikeButton.jsx";
import PostingUser from "../Post/PostingUser";
import "./Comment.css";

export const Comment = (props) => {
    return ( 
        <div className="Comment">
            <PostingUser post={props.comment} />
            <article key={props.comment._id}>
                {props.comment.body}
                <LikeDisplay />
            </article>
        </div>
    );
};