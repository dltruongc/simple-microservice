type CommentStatus = "approved" | "pending" | "rejected";

export type CommentType = {
  id: string;
  postId: string;
  content: string;
  status: CommentStatus;
};

export class CommentM {
  public readonly id: string;
  public readonly postId: string;
  public content: string;
  public readonly status: CommentStatus;

  constructor({ id, postId, content, status }: CommentType) {
    this.id = id;
    this.postId = postId;
    this.content = content;
    this.status = status;
  }

  static fromJson(json: string | { [P: string | number]: any }) {
    if (typeof json === "string") json = JSON.parse(json) as { [P: string | number]: any };

    const { id, postId, content, status } = json;

    if (!(id && postId && content != undefined && status)) {
      debugger;

      throw new TypeError("JSON format is not Comment type");
    }
    return new CommentM({
      id,
      postId,
      content,
      status,
    });
  }
}
