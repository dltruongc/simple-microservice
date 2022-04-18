import express from 'express';
import cors from 'cors';
import * as crypto from 'crypto';
import axios from 'axios';
import { CommentByPostId, Event, EventTypeEnum } from '../types';

const app = express();
const port = process.env.PORT;

// { [postId]: [{Comment}, {Comment}]

const commentsByPost: CommentByPostId = {};

app.use(cors()).use(express.json());

function emitToEventBus(event: Event) {
  axios.post('http://localhost:9001/events', event);
}

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

    emitToEventBus({
      type: EventTypeEnum.CommentCreated,
      data: comments[comments.length - 1],
    });

    return res.json(comments);
  });

app.route('/events').post((req, res) => {
  const { type, data } = req.body as Event;

  console.log('Event Received: ' + EventTypeEnum[type]);

  if (type === EventTypeEnum.CommentModerated) {
    let comment = commentsByPost[data.postId].find((cmt) => cmt.id === data.id);

    if (comment) {
      comment.status = data.status;
      emitToEventBus({ type: EventTypeEnum.CommentUpdated, data: comment });
    }
  }

  return res.json({});
});

app.listen(port, async () => {
  console.log('[Comments] listening on ' + port);

  // dealing with missed events
  const res = await axios.get<Event[]>('http://localhost:9001/events/comment');

  const events = res.data;

  for (const event of events) {
    console.log('Handling missed event: ' + EventTypeEnum[event.type]);
    // Something ...
  }
});
