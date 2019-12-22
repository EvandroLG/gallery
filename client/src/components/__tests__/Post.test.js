import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Post from '../Post';

afterEach(cleanup);

describe('post', () => {
  it('should render the component using the props', () => {
    const props = {
      image: 'image.jpg',
      description: 'nice description',
    };

    const { getByTestId } = render(<Post { ...props } />);

    expect(getByTestId('description')).toHaveTextContent(props.description);

    const image = getByTestId('image');
    expect(image.alt).toEqual(props.description);
    expect(image.src).toEqual(
      expect.stringMatching(new RegExp(`${props.image}$`))
    );
  });
});
