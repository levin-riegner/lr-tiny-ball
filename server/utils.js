function broadcast(WebSocket, clients, message, excludeClient = null) {
    clients.forEach((client, id) => {
        // client.ws.send(message);
        if (client.ws.readyState === WebSocket.OPEN && client.ws !== excludeClient) {
            client.ws.send(message);
        }
    });
}

function getClientsInfo(clients) {
    console.log(clients)
    // Copy clients map to an array where each array object contains all keys of the map except the "ws" key
    return Array.from(clients, ([id, client]) => {
        const { ws, ...rest } = client;
        return { id, ...rest };
    }
    );
}

module.exports = {
    broadcast,
    getClientsInfo
};