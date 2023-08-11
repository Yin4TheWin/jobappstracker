import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Root from '../routes/Root';
import Circuit from '../routes/Circuit';

class ResizeObserver {
    observe() {}
    unobserve() {}
  }

describe('The Root component', () => {
    window.ResizeObserver = ResizeObserver;
    test('renders "Finally, an organized job search."', () => {
        render(<Root />, {wrapper: MemoryRouter});
        const finallyText = screen.getByText('Finally,');
        const jobText = screen.getByText('an organized job search.');
        expect(finallyText).toBeInTheDocument();
        expect(jobText).toBeInTheDocument();
    });
    
    test('renders three images', () => {
        render(<Root />, {wrapper: MemoryRouter});
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(3);
    });
});

describe('The Circuit component', () => {
    test('renders link with text "Dynamic Circuit by Karthik Sankar" and href "https://dynamiccircuit.kihtrak.com/"', () => {
        render(<Circuit />);
        const link = screen.getByText('Dynamic Circuit by Karthik Sankar');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://dynamiccircuit.kihtrak.com/');
    });
});