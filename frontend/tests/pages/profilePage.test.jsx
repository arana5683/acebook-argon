import { render, screen } from "@testing-library/react";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
import { vi, expect } from "vitest";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../src/services/users";
import { getPostsForUser } from "../../src/services/posts";
vi.mock("../../src/services/users", () => {
    const getUserMock = vi.fn();
    return { getUser: getUserMock };
});
vi.mock("../../src/services/posts", () => {
    const getPostsForUserMock = vi.fn();
    return { getPostsForUser: getPostsForUserMock };
});

vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
});

describe ("Profile Page tests", () => {
    
    beforeEach(() => {
        window.localStorage.removeItem("token");
    });

    test("It navigates to login if no token is present", async () => {
        render(<ProfilePage />);
        const navigateMock = useNavigate();
        expect(navigateMock).toHaveBeenCalledWith("/login");
    });

    test("it displays user info from backend", async () => {
        window.localStorage.setItem("token", "testToken");
        
        const mockUser = {firstName: "user", lastName: "paul", email: "useremail@gmail.com"};
        const mockPost = {userId: "1", firstName: "user", lastName: "paul", message: "post", datetime: "1997"}
        
        getUser.mockResolvedValue({user: mockUser, token: "newtoken"});
        getPostsForUser.mockResolvedValue({post: mockPost, token: "newToken"})
        
        render(<ProfilePage />);
        
        expect(await screen.findByText("user paul")).toBeInTheDocument();
        expect(await screen.findByText("useremail@gmail.com")).toBeInTheDocument();
        expect(await screen.getByRole("img")).toBeVisible();
    });

    test("it displays post made by user", async () => {
        window.localStorage.setItem("token", "testToken");
        
        const mockUser = {firstName: "user", lastName: "paul", email: "useremail@gmail.com"};
        const mockPost = [{firstName: "user", lastName: "paul", message: "post"}];
        
        getUser.mockResolvedValue({user: mockUser, token: "newtoken"});
        getPostsForUser.mockResolvedValue({posts: mockPost, token: "newnewtoken"});
        
        render(<ProfilePage />);
        const post = await screen.findByText("post")
        expect(post).toBeVisible();
    });
});