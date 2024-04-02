import { render, screen, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import { getComments } from "../../src/services/comments";

import Post from "../../src/components/Post/Post";
import Comments from "../../src/components/Comments/Comments";
import createFetchMock from "vitest-fetch-mock";

createFetchMock(vi).enableMocks();

// Mocking the getComments service
vi.mock("../../src/services/comments", () => {
    const getCommentsMock = vi.fn();
    return { getComments: getCommentsMock };
});

describe("Comments", () => {
    
    beforeEach(() => {
        window.localStorage.removeItem("token");
    });
    
    test("Theres a comment button to push on Post component", () => {
        const testPost = { _id: "123", message: "test message" };
        render(<Post post={testPost} />);
        const button = screen.getByRole("button");
        expect(button.textContent).toBe("Comments");
    });

    test("The Comments component has a title", () => {
        window.localStorage.setItem("token", "testToken");
        const mockComments = [{body: "First Comment", 
        firstName: "Guy",
        lastName: "incognito",
        userID: "ID", 
        parentID: "660155fa0a81a51974be11c8"}]
        getComments.mockResolvedValue({ comments: mockComments, token: "newToken" });
        render(<Comments />);
        const title = screen.getByText("Comments:");
        expect(title.textContent).toBe("Comments:");
    });
    
    test("Multiple comments are displayed", async () => {
        
        window.localStorage.setItem("token", "testToken");
        
        const mockComments = [{
            body: "First Comment", 
            firstName: "Guy",
            lastName: "incognito",
            userID: "ID", 
            parentID: "PARENT ID"}, 
            
            {body: "Nice post!", 
            firstName: "Larry", 
            lastName: "Facebook", 
            parentID: "PARENT ID", 
            userID: "ID"}];
        
        getComments.mockResolvedValue({ comments: mockComments });
        render(<Comments post={{_id: "Parent ID"}} showComments={true} token={"testToken"}/>);
        
        waitFor(() => {
            const commenter1 = screen.getByText("Guy incognito");
            const commenter2 = screen.getByText("Larry Facebook");
            expect(commenter1.textContent).toBe("Guy incognito");
            expect(commenter2.textContent).toBe("Larry Facebook");})
    
        });
})
