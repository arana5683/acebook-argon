import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import { getComments } from "../../src/services/comments";

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
    
    test("The Comments component has a title", async () => {
        window.localStorage.setItem("token", "testToken");
        
        const mockComments = [{
            body: "First Comment", 
            firstName: "Guy",
            lastName: "incognito",
            userID: "ID", 
            parentID: "660155fa0a81a51974be11c8"}];
        
        getComments.mockResolvedValue({ comments: mockComments, token: "newToken" });
        
        render(<Comments parent={{_id: "660155fa0a81a51974be11c8"}} showComments={true} token={"testToken"}/>)
        
        const title = await screen.findByText("1 Comments:")
        expect(title).toBeVisible()
        
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
        render(<Comments parent={{_id: "PARENT ID"}} showComments={true} token={"testToken"}/>);
        
        const comment1 = await screen.findByText("First Comment");
        const comment2 = await screen.findByText("Nice post!");
        expect(comment1).toBeVisible();
        expect(comment2).toBeVisible();
    
    });

})
