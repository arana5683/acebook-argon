import { fireEvent, render, screen } from "@testing-library/react";
import LikeDisplay from "../../src/components/Post/LikeButton";

describe('unit testing for like display', () =>{

    test('increments when like button is fired', () => {
        render(<LikeDisplay />)
        const button = screen.getByRole('like-button')
        const countDisplay = screen.getByRole('like-counter')
        fireEvent.click(button)
        expect(countDisplay.textContent).toBe("1")

    })
    test('decrements when dislike button is fired', () => {
        render(<LikeDisplay />)
        const likeButton = screen.getByRole('like-button')
        const countDisplay = screen.getByRole('like-counter')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        const dislikeButton = screen.getByRole('dislike-button')
        fireEvent.click(dislikeButton)
        expect(countDisplay.textContent).toBe("2")


    })


})