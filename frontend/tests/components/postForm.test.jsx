import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {vi, expect }from 'vitest'
import PostForm from  "../../src/components/Post/PostForm";
import { postNewPost } from "../../src/services/posts";
import { handleNewPost } from "../../src/pages/Feed/FeedPage";

// Mocking postNewPost function with vitest
vi.mock('../../src/services/posts', () => {
    const postNewPostMock = vi.fn();
    return {postNewPost: postNewPostMock}
});

// Mocking handleNewPost function with vitest
vi.mock('../../src/pages/Feed/FeedPage', () => {
    const handleNewPostMock = vi.fn();
    return {handleNewPost: handleNewPostMock}
});

describe('unit testing for post form', () =>{

    test('testing that the textarea renders', () => {
        render(<PostForm />);
        const textArea = screen.getByRole('textbox');
        const button = screen.getByRole('post-button');
        expect(button.textContent).toBe("Post!");
        expect(textArea.placeholder).toBe("What's on your mind?");
    })

    test('testing that the textarea updates with users input', async () => {
        render(<PostForm />)
        const textArea = screen.getByRole('textbox')
        await userEvent.type(textArea, "This is a test post");

        expect(textArea.value).toBe("This is a test post");
    })

    test('testing that the post form is submitted with status 201', async () => {
        render(<PostForm handleNewPost={handleNewPost} />);
        const button = screen.getByRole('post-button');
        const textArea = screen.getByRole('textbox');

        await userEvent.type(textArea, "This is a test post");
        userEvent.click(button);

        expect(postNewPost).toHaveBeenCalled();
    })

})