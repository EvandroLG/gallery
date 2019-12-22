import throttle from '../throttle';

jest.useFakeTimers();

describe('throttle', () => {
  it('should execute callback function at most once in a certain period of time', () => {
    const callback = jest.fn();
    const timer = 500;

    throttle(callback, timer)();

    expect(callback).not.toHaveBeenCalled();
    expect(window.setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      timer
    );

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});
