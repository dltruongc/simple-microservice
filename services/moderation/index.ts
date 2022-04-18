import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { Event, EventTypeEnum } from '../types';

const app = express();
const port = process.env.PORT;

// { [postId]: [{Comment}, {Comment}]

app.use(cors()).use(express.json());

function emitToEventBus(event: Event) {
  axios.post('http://localhost:9001/events', event);
}

app.route('/events').post((req, res) => {
  const { type, data } = req.body as Event;

  console.log('Event Received: ' + EventTypeEnum[type]);

  if (type === EventTypeEnum.CommentCreated) {
    if (data.content.includes('orange')) data.status = 'rejected';
    else data.status = 'approved';

    emitToEventBus({
      type: EventTypeEnum.CommentModerated,
      data,
    });
  }

  return res.json({});
});

app.listen(port, async () => {
  console.log('[Moderation] listening on ' + port);

  // dealing with missed events
  const res = await axios.get<Event[]>(
    'http://localhost:9001/events/moderation',
  );

  const events = res.data;

  for (const event of events) {
    console.log('Handling missed event: ' + EventTypeEnum[event.type]);
    // Something ...
  }
});
