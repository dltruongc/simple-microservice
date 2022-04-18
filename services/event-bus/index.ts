import cors from 'cors';
import express from 'express';
import axios from 'axios';
import { Event, EventTypeEnum } from '../types';

const app = express();
const port = process.env.PORT;

type MissedEvents = {
  [P in 'query' | 'comment' | 'post']: Event[];
};
const missedEvents: MissedEvents = {
  query: [],
  comment: [],
  post: [],
};

app.use(cors()).use(express.json());

app.post('/events', async (req, res) => {
  const event = req.body;

  // dispatching an event
  try {
    await axios.post('http://localhost:4000/events', event);
  } catch (e) {
    console.log('[Post] Missed event ' + EventTypeEnum[event.type]);
    missedEvents.post.push(event);
  }
  try {
    await axios.post('http://localhost:4001/events', event);
  } catch (e) {
    console.log('[Comment] Missed event ' + EventTypeEnum[event.type]);
    missedEvents.comment.push(event);
  }
  try {
    await axios.post('http://localhost:4002/events', event);
  } catch (e) {
    console.log('[Moderation] Missed event ' + EventTypeEnum[event.type]);
    missedEvents.comment.push(event);
  }
  try {
    await axios.post('http://localhost:9000/events', event);
  } catch (e) {
    console.log('[Query] Missed event ' + EventTypeEnum[event.type]);
    missedEvents.query.push(event);
  }

  return res.json({});
});

app.route('/events/:type').get((req, res) => {
  const { type } = req.params as {
    type: keyof MissedEvents;
    [P: string | number]: any;
  };

  return res.json(missedEvents[type]);
});

// TODO: remove the recovered event(s) from missedEvents list

app.listen(port, () => console.log('[EventBus] listening on ' + port));
