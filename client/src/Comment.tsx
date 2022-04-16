import React from "react";
import { CommentM } from "./models/Comment";

export default function Comment({ comment }: { comment: CommentM }) {
  return <li>{comment.content}</li>;
}
