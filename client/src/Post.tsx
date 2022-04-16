import React from "react";
import Comments from "./Comments";
import CommentCreate from "./CommentCreate";
import { PostM } from "./models/Post";

export default function Post({ post }: { post: PostM }) {
  return (
    <div className="mb-2" style={{ width: "30%", display: "inline-block" }}>
      <div className=" card">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <Comments comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    </div>
  );
}
