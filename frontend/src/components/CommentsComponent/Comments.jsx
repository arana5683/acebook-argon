import { useState, useEffect } from "react";
import { getComments } from "../../services/comments";

const Comments = (props) => {
    const [backEndComments, setBackEndComments] = useState([])
    
    useEffect(() => {
            getComments(props.token).then((data) => {
                setBackEndComments(data)
            });
    }, []);
    
    return ( 
        <h5>
            {backEndComments}
        </h5>
    );
};

export default Comments; 