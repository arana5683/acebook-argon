import { render, screen } from '@testing-library/react';
import { FeedPage } from '../../src/pages/Feed/FeedPage';
import { vi } from "vitest";
import { NavBar } from '../../src/components/NavBar';

vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
});

describe("NavBar", () => {
    test('page should have a Log Out button', () => {
        render(<NavBar />);
        expect(screen.getByText("Log Out"));
});

    test('page should have a My Profile button', () => {
        render(<NavBar />);
        expect(screen.getByText("My Profile"));
});

    test('page should have a Homepage button', () => {
        render(<NavBar />);
        expect(screen.getByText("Homepage"));
});
})