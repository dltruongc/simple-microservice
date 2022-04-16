import React, { useEffect, useState } from "react";
import PostCreate from "./PostCreate";
import Posts from "./Posts";
import axios from "axios";
import { PostsM } from "./models/Post";

function App() {
  const [posts, setPosts] = useState<PostsM>({});

  const fetchPosts = () => {
    axios.get("http://localhost:4000/posts").then((res) => {
      const newPosts = PostsM.fromJson(res.data);
      setPosts(newPosts);
    });
  };

  useEffect(fetchPosts, []);

  return (
    <div className="container">
      <div className={"display-2"}>Create Post</div>
      <PostCreate onCreate={fetchPosts} />
      <div className={"display-2 mt-4"}>Posts List</div>
      <Posts posts={posts} />
    </div>
  );
}

export default App;
