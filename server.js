const io = require("socket.io")();

const MAX_LENGTH = 20;

const messages = [];

let currentMessageIdCounter = 0;

function noop() {}

function getNewMessageId() {
  const rv = `message-${currentMessageIdCounter}`;
  currentMessageIdCounter += 1;
  return rv;
}

function validateUsername(username) {
  return (
    typeof username === "string" &&
    username.length <= 12 &&
    username.length >= 1 &&
    /^[a-z0-9-_ ]+$/i.test(username)
  );
}

function validateContent(content) {
  return (
    typeof content === "string" && content.length <= 200 && content.length >= 1
  );
}

function onMessage(message, callback) {
  const { username, content } = message;

  callback = callback || noop;

  if (!validateUsername(username)) {
    return callback({ status: "error", message: "Invalid username" });
  }

  if (!validateContent(content)) {
    return callback({ status: "error", message: "Invalid content" });
  }

  const newMessage = {
    username,
    content,
    timestamp: Date.now(),
    id: getNewMessageId()
  };

  messages.push(newMessage);
  this.broadcast.emit("new_message", newMessage);
  callback({ status: "success", data: { newMessage } });

  if (messages.length > MAX_LENGTH) {
    messages.shift();
  }
}

io.on("connection", client => {
  console.log("Client connected");
  client.emit("messages", messages);
  client.on("message", onMessage);
});

console.log("Listening on port 8000");
io.listen(8000);
