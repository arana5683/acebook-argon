import LikeDisplay from "../Post/LikeButton.jsx";

export const Comment = (props) => {
    return ( 
        <h5 key={props.comment._id}>
            {props.comment.firstName} {props.comment.lastName}: {props.comment.body}
            <LikeDisplay />
        </h5>  
    );
};

