This project is the server for the website of a BTP company.

**INIT THE PROJECT SOURCES**
The sources and dependencies are handled by npm.
Simply run the command 
  npm install
It will use the content of the file *package.json* and install all dependencies in a *node_modules/* directory.

**WARNINGS**
* Never add the *node_modules/* directory to the git repository.

**LAUNCH THE SERVER**
The command :
  node main.js

**Architecture**
main.js is the entry point of the server. It calls functions and middleware available in the *src* directory.

**The content of the src directory**

1. contents
This directory contents the necessary ejs code to generate every web pages the server will return to a web browser.

2. database
This directory contents the pghandler.js file. That file contains all functions to communicate with the PostgresSql data base.
In the same directory, we have the *queries/* directory which contains javascript abstractions for every single SQL request performed in pghandler.js.
