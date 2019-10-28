import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Post from './Post';
import useScroll from '../hooks/useScroll';
import { authorizationHeader, getJson } from '../libs/http';
import API from '../api';
import statusCode from '../status';

const Main = styled.main`
  width: 95%;
  margin-top: 50px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

export default function Timeline() {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const ref = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedRequest = useCallback(() => request(), []);
  useScroll(ref, request);

  useEffect(() => memoizedRequest(), [memoizedRequest]);

  async function request() {
    try {
      setPage(prevPage => prevPage + 1);
      const newPosts = await getJson(
        API.GET_POSTS,
        { page },
        {
          ...authorizationHeader,
        },
      );

      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    } catch (e) {
      if (e.status === statusCode.UNAUTHORIZED) {
        setIsAuthorized(false);
      }
    }
  }

  return isAuthorized ? (
    <Main ref={ref}>
      {posts.map((post, key) => (
        <Post key={key} {...post} />
      ))}
    </Main>
  ) : (
    <Redirect to="/login" />
  );
}
