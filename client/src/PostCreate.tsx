import React, { FormEvent, FormEventHandler, useState } from "react";
import axios from "axios";

export default function PostCreate({ onCreate }: { onCreate: () => void }) {
  const [title, setTitle] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/posts", {
        title,
      })
      .then((_res) => {
        onCreate();
        setTitle("");
      });
  };

  return (
    <form method="POST" className="w-25" onSubmit={onSubmit}>
      <input
        className="form-control"
        type="text"
        name="title"
        id="title"
        value={title}
        placeholder={"Enter title here..."}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <input type="submit" className="mt-2 btn btn-primary" value="Submit" />
    </form>
  );
}
