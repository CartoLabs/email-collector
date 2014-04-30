email-collector
===============

#Basic email collector/landing page using node, mongo, and angular
Version 0.0.1

### current status
This tool is super rough.  This is just an initial commit.  Angular has been added to a publicly accessible directory, but is not being used yet.  The static index page is not connected to api yet.  Services currently are there to add an email, login with a hard coded username and pass-phrase, middleware looking @ a cookie for logged in users is working but needs to be improved.

### to run

**this assumes you have node .10 or greater and mongodb installed**
1.  After pulling this repo down, run npm install
2.  Make sure mongo is running
3.  npm start to fire up nodejs.  Default port is 3000
