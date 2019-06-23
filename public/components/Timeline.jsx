import React, { useState, useEffect } from "react";
import http from '../libs/http';
import Post from "./Post";
import styled from "styled-components";

const Main = styled.main`
  width: 95%;
  margin-top: 50px;
  margin: 0 auto;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

export default function Timeline() {
  const url = new URL('/api/posts/1', location.href);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function() {
      const posts = await http.get(url);
      setPosts(posts || []);
    })();
  }, []);

  return (
    <Main>
      {
        posts.map((post, key) => (
          <Post key={key} {...post} />
        ))
      }
    </Main>
  );
}
