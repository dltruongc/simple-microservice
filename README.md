# Introduction

Simple application that explains microservices working in theory.

This repository get inspired by **Microservices with Node JS and React** makes by _Stephen Grider_.

# Usage

1. Frontend:

```bash
cd client
npm run start
```

2. Services:

Move to services first `cd services`.

- Post service: `npm run dev:posts`
- Comment service: `npm run dev:comments`
- Query service: `npm run dev:query`
- EventBus service: `npm run dev:eventbus`

# Notes (drafting)

- Request Minimization Strategies:
  - By monoliths (internal features)
  - By Sync communication (dependent service will get data directly from other service(s))
  - [recommended] By Async communication (an event-based communication way)
    - Event Broker (event dispatcher & event syncing)
    - Query service (presentation)
    
- A service handle resources updated: If you have a service (X) that can updates on data of another service (A)
  - Option 1: X controls the creations of A
    - _A_ emit new data => _EventBus_, _X_ receives it and adding additional processes. Then _X_ emit new data with additions => _EventBus_. _A_ now received entire data and save it into DB, at the same time, _Query Service_ storing data for presentation.
    - [cons]: New data will never exist until X's process complete.
  - Option 2: X updates data from A
    - _A_ emit new data => _EventBus_ and stores it (so does the QueryService). Then _X_ takes stored data and processing additional processes to [Data2]. [Data2] => EventBus and entire services listen on A or X must update it own logics.
    - [disadvantage]: Query service must know exact what type of event and how to update [Data2].
    - [disadvantage]: All services sharing the same data with _A_ or _X_ must be updated according to X's update.
  - Option 3 [recommended]: Similar to Option 2 but QueryService only listens for 'update' events
    - QueryService no longer cares about what kind of Event, If new Data comes in, It will replace matching data in their storage.
    - _X_ becomes side effect service, all event comes out from _X_ needs to be processed by _A_. 
    - Only services that depends on _X_ needs to update.
    - _A_ takes all events sent by _X_, emits 'update' event to QueryService, nothing (service) else can emit 'update' on data type of _A_.
    - _A_ responsible for 'create', 'update', 'delete', ... events on it's data type.

- Dealing with missing events and data syncing.
  - Drafting here...
