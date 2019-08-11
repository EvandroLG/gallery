import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import http from "../libs/http";
import infiniteScroll from '../libs/infinite-scroll';
import Post from "./Post";

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
  const url = new URL("/api/posts", location.href);
  const [posts, setPosts] = useState([]);
  let [page, setPage] = useState(1);
  const ref = useRef();

  async function request() {
    url.searchParams.set('page', page);
    const newPosts = await http.get(url, {
      authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
    });

    if (!newPosts) { return; }

    setPosts(prev => [...prev, ...newPosts]);
    setPage(++page);
  }

  useEffect(() => {
    request();
    infiniteScroll(ref, request);
  }, []);

  return (
    <Main ref={ref}>
      {posts.map((post, key) => (
        <Post key={key} {...post} />
      ))}
    </Main>
  );
}
