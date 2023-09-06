const WebSocket = require("ws");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const { broadcast, getClientsInfo } = require("./utils");

const port = process.env.PORT || 3000;
const server = http.createServer();
const wss = new WebSocket.Server({ server });
const clients = new Map();

// Start server
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// Create WebSocket connection
wss.on("connection", (ws) => {

  // Create unique client data
  const clientId = uuidv4();
  const randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16)).padStart(6, '0');
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const clientDetails = { id: clientId, color: randomColor, letter: randomLetter };

  // Store client data
  clients.set(clientId, { ws: ws, ...clientDetails });

  // TERMINAL: Log status
  console.log(`Client connected: ${clientId} Total clients: ${clients.size}`);

  // CLIENT: Send initial data to client
  ws.send(
    JSON.stringify({
      client: clientDetails,
      connectedClients: getClientsInfo(clients),
      event: "init"
    })
  );

  // BROADCAST: Client details
  const newClientMessage = JSON.stringify({ client: clientDetails, event: "join" });
  broadcast(WebSocket, clients, newClientMessage, ws);

  // Listen for client messages
  ws.on("message", (message) => {
    console.log(message);
  });

  // Listen for client disconnect
  ws.on("close", () => {

    // Stop trackign client
    clients.delete(clientId);

    // TERMINAL: Log status
    console.log(`Client disconnected: ${clientId} Total clients: ${clients.size}`);

    // BROADCAST: Status update
    const leaveMessage = JSON.stringify({ client: clientDetails, event: "leave" });
    broadcast(WebSocket, clients, leaveMessage, ws);
  });
});
