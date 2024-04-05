import {Comment} from "../../src/components/Comments/Comment.jsx";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Mocking the isUserFollowed service
vi.mock("../../src/services/users", () => {
    const isUserFollowedMock = vi.fn();
    return { isUserFollowed: isUserFollowedMock };
});

describe("Comment compinent tests", () => {
    const testComment = {body: "First Comment", 
        firstName: "Guy",
        lastName: "incognito",
        userID: "ID", 
        parentID: "660155fa0a81a51974be11c8"}
    
    test("Comment displays properly with all info", () => {
        render(<Comment comment={testComment} />)
        expect(screen.getByRole("article")).toHaveTextContent("First Comment");
    });

})