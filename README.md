## Simple Chat Application - Advanced JavaScript with React  - [Live Demo]( http://truptigaonkar.github.io/mandatory-advanced-js1/)

<p align="center"> 
<img width="200" height="250" alt="1  signin" src="https://user-images.githubusercontent.com/14937374/76994451-aed85480-694e-11ea-829f-298867da1d19.png">
<img width="500" height="300" alt="2  chat" src="https://user-images.githubusercontent.com/14937374/76994446-abdd6400-694e-11ea-8133-ccb20b2ef52d.png">
</p>

### Instructions
* Create a simple chat application using React and backend server - Socket.io server is provided http://mandatory-advanced-js1.devspace.host/.
* Socket.io is a library that enables real-time communication between a client and a server. The client and server communicates by sending and receiving events. Please refer to the documentation for more information. https://socket.io/docs/

#### Technologies
- Node
- React
- Backend: Socket.io library (https://socket.io/docs/ )
- reactstrap (https://reactstrap.github.io/)

#### Installation
**REACT**
```
  $ git clone git@github.com:truptigaonkar/mandatory-advanced-js1.git
  $ cd mandatory-advanced-js1.git
  $ npm install
  $ npm start
```
**Express**
```
  $ node server/server.js
  $ npm start
```
#### Events
The server sends the following events
* messages - This event is sent automatically when a client connects and will give a list of all messages on the server
* new_message - This event is sent to all clients (except the sender) when a new message is sent to the server
* A message sent from the server has the following structure
```
{
    username: “A username”,
    content: “A message”,
    timestamp: 1551191228686, // A timestamp in milliseconds
    id: “message-120”, // A unique ID
}
```
* To send a new message to the server an event called “message” is sent from the client. The message should have the following form: 
```
{
    username: “A username”,
    content: “A message”,
}
```
#### The client
* Your task is to implement a client for this server. The client should be implemented using React and contain two views:
    * A “login” screen where the user inputs a username
    * A “chat” screen that shows all the messages and contains a text input field where the user can add new messages
* When sending a new message to the server it will not be returned to the sender (it’s only sent to all other connected clients) but it must still be shown in the client.
#### Validation
* The server has some limitations on the username and content
    * The username can only contain alphanumeric characters, “-”, “_” and spaces and must be between 1 and 12 characters long
    * The content must be between 1 and 200 characters long
* This validation should be added to the client.
#### Emojis
The client should handle emojis, similar to how it works in Slack.
    * E.g. if the message contains the string “:heart:” it should be replaced with a heart emoji. You are required to support at least three different emojis.
#### Links
If a message contains a URL it should be automatically converted to a link.
#### Requirements
* If a message contains a URL it should be automatically converted to a link.
* It should contain a “login” screen with a text input and a button. This screen is shown when the app is opened. 
* When a username is submitted the user is shown a “chat” screen with a text input for sending messages and a list of messages.
* The message list should be populated with the messages received from the server and new messages should be added automatically (including messages sent from the client) 
* The chat screen should contain a “close” button so the user can return to the “login” screen. 
* Support for emojis. 
* Automatically convert URLs into links 
#### My Contribution:
- [x] styling
    - [x]  reactstrap
    - [x]  Google Font
    - [x]  Font Awesome


