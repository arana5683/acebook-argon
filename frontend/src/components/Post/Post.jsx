import PostingUser from "./PostingUser";

const Post = (props) => {
  return (
    <>
      <article key={props.post._id}>{props.post.message}</article>
      <PostingUser post={props.post} />
    </>
  );
};

export default Post;
