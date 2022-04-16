import { CommentM } from "./Comment";

type PostType = { id: string; title: string; comments: Array<Comment | unknown> };

export class PostM {
  public readonly comments: CommentM[];
  public readonly id: string;
  public title: string;

  constructor(payload: PostType) {
    this.id = payload.id;
    this.title = payload.title;
    this.comments = payload.comments.map((cmt) => {
      if (!(cmt instanceof CommentM)) return new CommentM(cmt as any);
      return cmt;
    });
  }

  static fromJson(json: string | { [P: string | number]: any }) {
    if (typeof json === "string") json = JSON.parse(json) as { [P: string | number]: any };

    const { comments, id, title } = json;

    if (!(id && title != undefined && Array.isArray(comments))) throw new TypeError("JSON is not type of Post");

    return new PostM({
      id,
      title,
      comments,
    });
  }
}

type PostsType = { [id: string]: PostType };

export class PostsM {
  [id: string]: PostM;

  constructor(payload: PostsType) {
    Object.values(payload).map((post) => {
      this[post.id] = new PostM(post);
    });
  }

  static fromJson(json: string | { [P: string]: any }) {
    if (typeof json === "string") json = JSON.parse(json) as { [P: string]: any };

    const posts = new PostsM(json);

    Object.values(json).map((post) => {
      posts[post.id] = PostM.fromJson(post);
    });

    return posts;
  }
}
