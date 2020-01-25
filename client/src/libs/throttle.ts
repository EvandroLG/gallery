export default (callback: () => void, wait: number) => {
  let wasCalled = false;

  return () => {
    if (!wasCalled) {
      wasCalled = true;

      setTimeout(() => {
        callback();
        wasCalled = false;
      }, wait);
    }
  };
};
