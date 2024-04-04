import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";
import { postNewPost } from "../../src/services/posts";

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  const postNewPostMock = vi.fn();
  return { getPosts: getPostsMock, postNewPost: postNewPostMock};
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "Test Post 1" }];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
    
    render(<FeedPage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toEqual("Test Post 1");
  });

  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test('testing that the post form is submitted with status 201', async () => {
    window.localStorage.setItem("token", "testToken");
    render(<FeedPage />);
    const button = await screen.findByRole('post-button');
    const textArea = await screen.findByRole('textbox');

    await userEvent.type(textArea, "This is a test post");
    await userEvent.click(button);

    expect(postNewPost).toHaveBeenCalled();
  });
});
