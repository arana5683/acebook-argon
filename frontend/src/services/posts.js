// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};


export const getPostsForUser = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts?profile=true`, requestOptions);
  
  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
}


export const postNewPost = async (token, postContents) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: postContents
  }

  // JSON.stringify({ message: postContents.get('message'), image: postContents.get('image')
  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);
  
  if (response.status !== 201) {
    console.log(response.status)
    throw new Error(
      `Received status ${response.status}. Expected 201. Unable to create post.`)
  }
};

export const updatePostLikesArr = async (token, likeContents) => {
  const requestOptions = {
      method: "PUT",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
      },
      body: JSON.stringify(likeContents),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);
  const data = await response.json();

  if (response.status !== 200) {
      throw new Error(`Received status ${response.status}. Unable to update post.`);
  }
  return data;
};

export const checkLikeStatus = async (token, content) => {
  try {
      const response = await fetch(`${BACKEND_URL}/posts/${content.postId}/likeStatus`, {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });

  if (response.ok) {
      const data = await response.json();
      return data
  } else {
      throw new Error('Failed to fetch like status');
  }
} catch (error) {
  console.error('Error:', error);
}}

export const getPostLikes = async (token, postId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await fetch(`${BACKEND_URL}/posts/${postId}/likes`, requestOptions);

  if (response.status !== 200) {
    throw new Error(`Received status ${response.status}. Unable to fetch like array.`);
  }

  const data = await response.json();
  return data.likes;
}