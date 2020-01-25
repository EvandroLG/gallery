import { useEffect, RefObject } from 'react';
import throttle from '../libs/throttle';

export default (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleScroll = throttle(() => {
      const current = ref.current;
      const pageBottom = window.innerHeight + window.pageYOffset;
      const shouldLoadMorePosts =
        current && current.getBoundingClientRect().bottom < pageBottom;

      if (shouldLoadMorePosts) {
        callback();
      }
    }, 1000);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, callback]);
};
