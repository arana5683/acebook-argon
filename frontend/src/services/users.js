const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUser = async (token) => {
const requestOptions = {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch user");
  }

  const data = await response.json();
  return data;

};

export const followUser = async (token, targetId) => {
  const target = { "targetId": targetId };
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify(target),
  };

  const response = await fetch(`${BACKEND_URL}/users/follow`, requestOptions);
  
  if (response.status !== 200) {
    console.log(response.status);
    throw new Error(
      `Received status ${response.status}. Expected 200. Unable to follow user.`);
  }
}

export const unfollowUser = async (token, targetId) => {
  const target = { "targetId": targetId };
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify(target),
  };

  const response = await fetch(`${BACKEND_URL}/users/unfollow`, requestOptions);
  
  if (response.status !== 200) {
    console.log(response.status);
    throw new Error(
      `Received status ${response.status}. Expected 200. Unable to unfollow user.`);
  }
}

export const isUserFollowed = async (token, targetId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users/following?targetId=${targetId}`, requestOptions);
  
  if (response.status !== 200) {
    console.log(response.status);
    throw new Error(
      `Received status ${response.status}. Expected 200. Unable to check if user is already followed.`);
  }

  const data = await response.json();
  return data;
}