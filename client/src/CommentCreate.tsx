import React, { FormEvent, FormEventHandler, useState } from "react";
import axios from "axios";

export default function CommentCreate({ postId, onCreate }: { postId: string; onCreate: () => void }) {
  const [content, setContent] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`http://localhost:4001/posts/${postId}/comments`, { content }).then((_res) => {
      onCreate();
      setContent("");
    });
  };

  return (
    <form method={"post"} onSubmit={onSubmit}>
      <input
        type="text"
        name="content"
        id="content"
        value={content}
        className="form-control mb-1"
        placeholder="Enter new comment..."
        onChange={(e) => setContent(e.currentTarget.value)}
      />
      <input type="submit" value="Add" className="btn btn-primary" />
    </form>
  );
}
