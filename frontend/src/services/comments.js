const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getComments = async (token) => {
const requestOptions = {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
};

const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);

if (response.status !== 200) {
    throw new Error("Unable to fetch comments");
}
console.log("Retreiving Comments")
const data = await response.json();
return data;
};