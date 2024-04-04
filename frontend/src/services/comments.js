const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getComments = async (token, postId) => {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/comments?postId=${postId}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch comments");
    }
    console.log("Retreiving Comments")
    const data = await response.json();
    return data;
};

export const postNewComment = async (token, comment) => {
    const requestOptions = {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
    },
    body: JSON.stringify(comment),
    };

    const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);
    
    if (response.status !== 201) {
    console.log(response.status)
    throw new Error(
        `Received status ${response.status}. Expected 201. Unable to create comment.`)
    }
}