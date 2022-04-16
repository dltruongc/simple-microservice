import cors from 'cors';
import express from 'express';
import * as crypto from 'crypto';
import axios from 'axios';
import { Event, EventTypeEnum, Post, Posts } from '../types';

const app = express();

const posts: Posts = {};

app.use(cors()).use(express.json());

function emitToEventBus(event: Event) {
  axios.post('http://localhost:9001/events', event);
}

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

    emitToEventBus({
      type: EventTypeEnum.PostCreated,
      data: post,
    });

    return res.json(post);
  });

app.route('/events').post((req, res) => {
  const { type, data } = req.body as Event;

  console.log('Event Received: ' + EventTypeEnum[type]);

  return res.json({});
});

const port = process.env.PORT;

app.listen(port, async () => {
  console.log('[Post] listening on ' + port);

  // dealing with missed events
  const res = await axios.get<Event[]>('http://localhost:9001/events/post');

  const events = res.data;

  for (const event of events) {
    console.log('Handling missed event: ' + EventTypeEnum[event.type]);
    // Something ...
  }
});
