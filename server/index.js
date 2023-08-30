const WebSocket = require("ws");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const { broadcast, getClientsInfo } = require("./utils");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const clients = new Map();


wss.on("connection", (ws) => {

  // Create unique id for client and keep track of it
  const clientId = uuidv4();
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const clientDetails = { id: clientId, color: randomColor, letter: randomLetter };
  clients.set(clientId, { ws: ws, ...clientDetails });

  // Log connection info
  console.log(`Client connected: ${clientId} Total clients: ${clients.size}`);

  // Send welcome message to client
  const welcomeData = JSON.stringify({
    client: clientDetails, connectedClients: getClientsInfo(clients), event: "init"
  });
  ws.send(welcomeData);

  // Inform other clients that a new client has joined
  const newClientMessage = JSON.stringify({ client: clientDetails, event: "join" });
  broadcast(WebSocket, clients, newClientMessage, ws);

  // Listen for messages from the client
  ws.on("message", (message) => {
    console.log(message);
  });

  // Listen for client disconnection
  ws.on("close", () => {

    // Stop trackign client
    clients.delete(clientId);

    // Log connection info
    console.log(`Client disconnected: ${clientId} Total clients: ${clients.size}`);

    // Inform other clients that a client has left
    const leaveMessage = JSON.stringify({ client: clientDetails, event: "leave" });
    broadcast(WebSocket, clients, leaveMessage);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
