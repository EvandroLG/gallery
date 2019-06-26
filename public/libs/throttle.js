export default (callback, wait) => {
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
