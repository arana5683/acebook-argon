import { fireEvent, render, screen } from "@testing-library/react";
import { expect }from 'vitest'
import CommentForm from "../../src/components/Comments/CommentForm";

    describe("testing comment form component", () => {
        
        test("testing that there is a text-area", () => {
            render(<CommentForm />)
            const textArea = screen.getByRole("textbox")
            const submitButton = screen.getByRole("post-button")
            expect(textArea.placeholder).toBe("Leave a Comment")
            expect(submitButton.textContent).toBe("Submit")
        });

        test("Component updates with text input", () => {
            render(<CommentForm />);
            const textArea = screen.getByRole("textbox");
            fireEvent.change(textArea, {target: {value: "test comment"}})
            expect(textArea.value).toBe("test comment")
        });

})