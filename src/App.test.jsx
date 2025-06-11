import {render, screen} from '@testing-library/react';
import App from './App';
import { vi, describe, it, expect } from 'vitest';

//Mock the Approutes component 
vi.mock('/routes/AppRoutes', () => ({default: () => <div>Mock AppRoutes</div>,}));

describe('App', () => {
    it('renders AppRoutes', () => {
        render(<App />);
        expect(screen.getByText('Mock AppRoutes')).toBeInTheDocument();
    });
});

