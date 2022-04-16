import React from "react";
import Post from "./Post";
import { PostsM } from "./models/Post";

export default function Posts({ posts }: { posts: PostsM }) {
  const renderPosts = () => {
    return Object.values(posts).map((post) => {
      return <Post key={post.id} post={post} />;
    });
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap">{renderPosts()}</div>
    </React.Fragment>
  );
}
