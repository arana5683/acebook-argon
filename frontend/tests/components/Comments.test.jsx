import { render, screen } from "@testing-library/react";
import Post from "../../src/components/Post/Post";


describe("Comments", () => {
    test("Theres a comment button to push on Post component", () => {
        const testPost = { _id: "123", message: "test message" };
        render(<Post post={testPost} />);
        const button = screen.getByRole("button");
        expect(button.textContent).toBe("Comments");
    });
    
});
