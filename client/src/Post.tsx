import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import CommentCreate from "./CommentCreate";
import axios from "axios";
import { PostM } from "./models/Post";
import { CommentM } from "./models/Comment";

export default function Post({ post }: { post: PostM }) {
  const [comments, setComments] = useState<CommentM[]>([]);

  const fetchComments = () => {
    axios.get(`http://localhost:4001/posts/${post.id}/comments`).then((res) => {
      const comments = (res.data as any[]).map((cmt) => CommentM.fromJson(cmt));

      setComments(comments);
    });
  };

  useEffect(fetchComments, []);

  return (
    <div className="mb-2" style={{ width: "30%", display: "inline-block" }}>
      <div className=" card">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <Comments comments={comments} />
          <CommentCreate postId={post.id} onCreate={fetchComments} />
        </div>
      </div>
    </div>
  );
}
