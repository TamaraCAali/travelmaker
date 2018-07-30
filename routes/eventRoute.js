const EVENT_URL = '/data/event';
const eventService = require('./services/eventService.js');

module.exports = app => {
  app.get(EVENT_URL, (req, res) => {
    console.log('inside back event');

    eventService.query().then(events => res.json(events));
  });

  app.get(EVENT_URL + '/:eventId', (req, res) => {
    const eventId = req.params.eventId;

    eventService.getById(eventId).then(event => res.json(event));
  });

  app.delete(EVENT_URL + '/:eventId', (req, res) => {
    const eventId = req.params.eventId;

    eventService
      .remove(eventId)
      .then(() => res.end(`Event ${eventId} Deleted `));
  });

  app.post(EVENT_URL, (req, res) => {
    const event = req.body;
    eventService.add(event).then(event => {
      res.json(event);
    });
  });

  app.put(EVENT_URL + '/:eventId', (req, res) => {
    const event = req.body;
    eventService.update(event).then(event => res.json(event));
  });
};
