import express from 'express';
import cors from 'cors';
import * as crypto from 'crypto';

type CommentStatus = 'approved' | 'pending' | 'rejected';

type CommentType = {
  id: string;
  postId: string;
  content: string;
  status: CommentStatus;
};

type CommentByPostId = { [postId: string]: CommentType[] };

const app = express();
const port = process.env.PORT;

// { [postId]: [{Comment}, {Comment}]

const commentsByPost: CommentByPostId = {};

app.use(cors()).use(express.json());

app
  .route('/posts/:postId/comments')
  .get((req, res) => {
    const { postId }: { postId: string } = req.params;

    const comments = commentsByPost[postId] || [];

    return res.json(comments);
  })
  .post((req, res) => {
    const { postId }: { postId: string } = req.params;
    const { content } = req.body;

    const comments = (commentsByPost[postId] = commentsByPost[postId] || []);

    comments.push({
      id: crypto.randomInt(0, 9999).toString(),
      content,
      postId,
      status: 'pending',
    });

    return res.json(comments);
  });

app.listen(port, () => console.log('[Comments] listening on ' + port));
