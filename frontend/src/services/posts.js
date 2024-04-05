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
  console.log(postContents.get('message'), postContents.get('image'))
  // console.log(postContents)
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
}