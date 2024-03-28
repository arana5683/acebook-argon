import { render, screen } from "@testing-library/react";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
import { vi, expect } from "vitest";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../src/services/users";

vi.mock("../../src/services/users", () => {
    const getUserMock = vi.fn();
    return { getUser: getUserMock };
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
        getUser.mockResolvedValue({user: mockUser, token: "newtoken"});
        render(<ProfilePage />);
        expect(await screen.findByText("user paul")).toBeInTheDocument();
        expect(await screen.findByText("useremail@gmail.com")).toBeInTheDocument();
        expect(await screen.getByRole("img")).toBeVisible();
    });
})