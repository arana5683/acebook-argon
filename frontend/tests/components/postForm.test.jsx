import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect }from 'vitest'
import PostForm from  "../../src/components/Post/PostForm";

describe('unit testing for post form', () =>{

    test('testing that the textarea renders', () => {
        render(<PostForm />);
        const textArea = screen.getByRole('textbox');
        const button = screen.getByRole('post-button');
        expect(button.textContent).toBe("Post!");
        expect(textArea.placeholder).toBe("What's on your mind?");
    });

    test('testing that the textarea updates with users input', async () => {
        render(<PostForm />)
        const textArea = screen.getByRole('textbox')
        await userEvent.type(textArea, "This is a test post");

        expect(textArea.value).toBe("This is a test post")
    })

    test('testing that the post form is submitted with status 201', () => {
        render(<PostForm />)
        const button = screen.getByRole('post-button')
        const textArea = screen.getByRole('textbox')

        fireEvent.change(textArea, {target: {value: "This is a test post"}})
        fireEvent.click(button)
        expect(postNewPost).toHaveBeenCalled();
    })

})