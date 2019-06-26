import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from '../Header';

afterEach(cleanup);

describe('header', () => {
  it('should renders the component', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
