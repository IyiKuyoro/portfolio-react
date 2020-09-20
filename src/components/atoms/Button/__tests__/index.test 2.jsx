import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Button from '..';

describe('Atom: Button (ST)', () => {
  it('Button calls handler method when clicked', (done) => {
    const mockClickHandler = jest.fn();

    const component = renderer.create(
      <Button
        text="Click Me"
        handleClick={mockClickHandler}
      />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    done();
  });
});

describe('Atom: Button (DT)', () => {
  afterEach(cleanup);

  it('should calls the handler method when clicked', (done) => {
    const mockClickHandler = jest.fn();

    const { getByText } = render(
      <Button
        text="Click Me"
        handleClick={mockClickHandler}
      />,
    );

    fireEvent.click(getByText('Click Me'));

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    done();
  });

  it('should render button correctly', (done) => {
    const mockClickHandler = jest.fn();

    const { queryByText } = render(
      <Button
        text="Click Me"
        handleClick={mockClickHandler}
      />,
    );

    expect(queryByText('Click Me')).toBeTruthy();
    done();
  });
});
