import cors from 'cors';
import express from 'express';

import { Event, EventTypeEnum, Posts } from '../types';
import axios from 'axios';

const app = express();
const posts: Posts = {};
const port = process.env.PORT;

app.use(cors()).use(express.json());

function handlerIncomingEvent(event: Event): void {
  const { data, type } = event;
  if (type === EventTypeEnum.PostCreated) {
    posts[data.id] = data;
  }
  if (type === EventTypeEnum.CommentCreated) {
    posts[data[0].postId].comments.push(...data);
  }
}

app.post('/events', (req, res) => {
  const event: Event = req.body;
  console.log('An event is coming in: ' + EventTypeEnum[event.type]);

  handlerIncomingEvent(event);
  return res.json({});
});

// working as presentation layer
app.route('/posts').get((_req, res) => res.json(posts));

app.listen(port, async () => {
  console.log('[Query] listening on ' + port);

  // dealing with missed events
  const res = await axios.get<Event[]>('http://localhost:9001/events/query');

  const events = res.data;

  for (const event of events) {
    console.log('Handling missed event: ' + EventTypeEnum[event.type]);
    handlerIncomingEvent(event);
  }
});
