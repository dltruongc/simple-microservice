import React from "react";
import Comment from "./Comment";
import { CommentM } from "./models/Comment";

export default function Comments({ comments }: { comments: CommentM[] }) {
  const renderComments = () => {
    return (
      <ul className="card-text">
        {comments.map((cmt) => (
          <Comment key={cmt.id} comment={cmt} />
        ))}
      </ul>
    );
  };

  return <>{renderComments()}</>;
}
