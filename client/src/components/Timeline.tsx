import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import API from '../configs/api';
import statusCode from '../configs/status';
import useScroll from '../hooks/useScroll';
import { IPost } from '../interfaces/post';
import { authorizationHeader, getJson } from '../libs/http';
import Post from './Post';

const Main = styled.main`
  width: 95%;
  margin-top: 50px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

export default function Timeline() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const ref = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedRequest = useCallback(() => request(), []);
  useScroll(ref, request);

  useEffect(() => {
    (async () => {
      await memoizedRequest();
    })();
  }, [memoizedRequest]);

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
      {posts.map(({ image, description, createdAt }, key) => (
        <div key={key}>
          <Post image={image} description={description} createdAt={createdAt} />
        </div>
      ))}
    </Main>
  ) : (
    <Redirect to="/login" />
  );
}
