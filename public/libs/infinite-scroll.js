import { useEffect } from 'react';
import throttle from './throttle.js';

export default function infiniteScroll(ref, callback) {
  const onScroll = () => {
    const current = ref.current;
    const pageBottom = window.innerHeight + window.pageYOffset;
    const shouldLoadMorePosts = current && current.getBoundingClientRect().bottom < pageBottom;

    if (shouldLoadMorePosts) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(onScroll, 1000));
  }, []);
}
