import { fireEvent, render, screen } from "@testing-library/react";
import LikeDisplay from "../../src/components/Post/LikeButton";
import {vi, expect} from "vitest";
import { getPostLikes} from "../../src/services/posts";

vi.mock("../../src/services/posts", () => {
    const getPostLikesMock = vi.fn().mockResolvedValue(["660d244ff782091e9d6706d4"]); 
    const updatePostLikesArrMock = vi.fn().mockResolvedValue('The post has been liked'); 

    return {
        getPostLikes: getPostLikesMock,
        updatePostLikesArr: updatePostLikesArrMock
    };
});

describe('unit testing for like display', () =>{

    test('getPostLikes function triggers when button is clicked', () => {
        render(<LikeDisplay />)
        const button = screen.getByRole('like-button')
        fireEvent.click(button)
        expect(getPostLikes).toHaveBeenCalled();
    })

    test('screen renders length of likes array', async () => {
            const mockPostId = "testPostId";
            render(<LikeDisplay postId= {mockPostId} />);
            const likeCounter = await screen.findByRole('like-counter');
            const initialCounterValue = likeCounter.textContent;
            await screen.findByRole('like-counter');
            expect(initialCounterValue).toBe("Likes: 1");
        });

    })
    



