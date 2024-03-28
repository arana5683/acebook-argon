import Comments from "../CommentsComponent/Comments.jsx";
import PostingUser from "./PostingUser";
import "./Post.css"

const Post = (props) => {
  return (
    <>
    <div className="Post">
      <PostingUser post={props.post}/>
      <article className="testContent" key={props.post._id}>{props.post.message}</article>
    </div>
    <Comments token={props.token} />
    </>
  );
};

export default Post;
