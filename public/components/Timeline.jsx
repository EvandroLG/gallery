import React, { useState, useEffect, useRef } from "react";
import { Redirect } from 'react-router-dom';
import styled from "styled-components";
import Post from "./Post";

import { get, authorizationHeader } from "../libs/http";
import infiniteScroll from '../libs/infinite-scroll';
import statusCode from '../status';

const Main = styled.main`
  width: 95%;
  margin-top: 50px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

Main.defaultProps = {
  ['data-testid']: 'timeline',
};

export default function Timeline() {
  const url = new URL('/api/posts', location.href);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [posts, setPosts] = useState([]);
  let [page, setPage] = useState(1);
  const ref = useRef();

  async function request() {
    url.searchParams.set('page', page);

    try {
      const newPosts = await get(url, {
        ...authorizationHeader,
      });

      setPosts(prev => [...prev, ...newPosts]);
      setPage(++page);
    } catch(e) {
      if (e.status === statusCode.UNAUTHORIZED) {
        setIsAuthorized(false);
      }
    }
  }

  useEffect(() => {
    request();
    infiniteScroll(ref, request);
  }, []);

  return (
    isAuthorized ?
      <Main ref={ref}>
        {posts.map((post, key) => (
          <Post key={key} {...post} />
        ))}
      </Main>
    :
      <Redirect to='/login' />
  );
}
