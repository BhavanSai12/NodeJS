Node.js is an open source server environment.

Node.js allows you to run JavaScript on the server.

What is Node.js?
- Node.js is an open source server environment
- Node.js is free
- Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
- Node.js uses JavaScript on the server

What Can Node.js Do?
- Node.js can generate dynamic page content
- Node.js can create, open, read, write, delete, and close files on the server
- Node.js can collect form data
- Node.js can add, delete, modify data in your database  

What is a Node.js File?
- Node.js files contain tasks that will be executed on certain events
- A typical event is someone trying to access a port on the server
- Node.js files must be initiated on the server before having any effect
- Node.js files have extension ".js"

What is a Package?
- A package in Node.js contains all the files you need for a module.
- Modules are JavaScript libraries you can include in your project.

What is a Module in Node.js?
- Consider modules to be the same as JavaScript libraries.
- A set of functions you want to include in your application.

Built-in Modules
- Node.js has a set of built-in modules which you can use without any further installation.
- Look at our Built-in Modules Reference for a complete list of modules.

Example:
```
var http = require('http');
var dt = require('./myfirstmodule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(8080);
```