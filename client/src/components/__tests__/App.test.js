import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('app', () => {
  it('should render head and timeline components', () => {
    const { getAllByTestId } = render(<App />);
    const timeline = getAllByTestId('timeline');
    const header = getAllByTestId('header');

    expect(timeline.length).toBe(1);
    expect(header.length).toBe(1);
  });
});
