import cors from 'cors';
import express from 'express';
import * as crypto from 'crypto';

const app = express();

type CommentStatus = 'approved' | 'pending' | 'rejected';

type CommentType = {
  id: string;
  postId: string;
  content: string;
  status: CommentStatus;
};

type Post = { id: string; title: string; comments: CommentType[] };

type Posts = { [id: string]: Post };

const posts: Posts = {};

app.use(cors()).use(express.json());

app
  .route('/posts')
  .get((_req, res) => res.json(posts))
  .post((req: express.Request, res) => {
    const { title } = req.body;

    const post: Post = {
      title,
      id: crypto.randomInt(0, 9999).toString(),
      comments: [],
    };

    posts[post.id] = post;

    return res.json(post);
  });

const port = process.env.PORT;

app.listen(port, () => console.log('[Post] listening on ' + port));
