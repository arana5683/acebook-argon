import { fireEvent, render, screen } from "@testing-library/react";
import LikeDisplay from "../../src/components/Post/LikeButton";
import {vi, expect} from "vitest";
import Post from "../../src/components/Post/Post.jsx";
import { getPostLikes } from "../../src/services/posts";

vi.mock("../../src/services/posts", () => {
    const getPostLikesMock = vi.fn();
    return {getPostLikes: getPostLikesMock};
});

// vi.mock("../../src/services/posts", () => {
//     const updatePostLikesArrMock = vi.fn();
//     return {updatePostLikesArr: updatePostLikesArrMock};
// });

describe('unit testing for like display', () =>{

    test('getPostLikes function triggers when button is clicked', () => {
        
        render(<LikeDisplay />)
        const button = screen.getByRole('like-button')
        fireEvent.click(button)
        expect(getPostLikes).toHaveBeenCalled();
    })

    test('count display increases when button is clicked', async () => {
        const testPost = {_id: "333", firstName: "Jon", lastName: "Snow", message: "I dun want it", likes: [123456789], userId: "123456789"};
        const { getByRole, findByRole } = render(<LikeDisplay postId="660d244ff782091e9d6706d4" />);
    const likeCounter = await findByRole('like-counter');
    const likeButton = getByRole('like-button');
    // Get the initial value of the like counter
    const initialCounterValue = parseInt(likeCounter.textContent);
    // Simulate a click on the like button
    fireEvent.click(likeButton);
    // Get the updated value of the like counter
    const updatedCounterValue = parseInt(likeCounter.textContent);
    // Assert that the like counter has been incremented
    expect(updatedCounterValue).toBe(initialCounterValue + 1);
  });

    })
    

    // test('increments when like button is fired', () => {
    //     render(<LikeDisplay />)
    //     const button = screen.getByRole('like-button')
    //     const countDisplay = screen.getByRole('like-counter')
    //     fireEvent.click(button)
    //     expect(countDisplay.textContent).toBe("1")

    // })



