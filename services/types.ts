export type CommentStatus = 'approved' | 'pending' | 'rejected';

export type CommentType = {
  id: string;
  postId: string;
  content: string;
  status: CommentStatus;
};

export type CommentByPostId = { [postId: string]: CommentType[] };

export enum EventTypeEnum {
  PostCreated = 0,
  CommentCreated,
  CommentModerated,
  CommentUpdated,
}

export type Event =
  | { type: EventTypeEnum.PostCreated; data: Post }
  | { type: EventTypeEnum.CommentCreated; data: CommentType }
  | { type: EventTypeEnum.CommentUpdated; data: CommentType }
  | { type: EventTypeEnum.CommentModerated; data: CommentType };

export type Post = { id: string; title: string; comments: CommentType[] };

export type Posts = { [id: string]: Post };
