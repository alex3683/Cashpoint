The Cashpoint app is mainly a simple project to play a bit with new technologies like nodejs, mongodb and nowjs and become more familiar with new HTML5 apis. By sharing this on github others may learn from what I'm learning, give feedback or perhaps even contribute things.

# Attention:

This project is in its early beginnings and far from being done.

# Setup:

You only need a running [mongoDB](http://www.mongodb.org/) server and [node.js](http://nodejs.org/) installed. This application is developed using version 0.6.3 of node.js, but it might run as well under an earlier version.

If necessary make changes to config.json (which should be quite self-explanatory).

Then fire it up: `node cashpoint.js`

# Used libraries:

## on the server:

- [connect](http://senchalabs.github.com/connect/)
- [connect-gzip](https://github.com/nateps/connect-gzip)
- [mongoose](http://mongoosejs.com/)
- [now](http://nowjs.com)

## on the client

- [Date Format](http://blog.stevenlevithan.com/archives/date-time-format)
- [Handlebars.js](http://www.handlebarsjs.com/)
- [jQuery](http://jquery.com)
- [jQuery UI](http://jqueryui.com/)
- [RequireJS](http://requirejs.org/)