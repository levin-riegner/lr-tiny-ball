export default class ServerClient {
  constructor(url = 'ws://localhost:3000') {
    this.ws = new WebSocket(url);
    this.bindEvents();

    this.client = null;
    this.connectedClients = [];

    this.onChange = () => null;

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === 'init') this.initialize(data);
      if (data.event === 'leave') this.removeClient(data.client)
      if (data.event === 'join') this.addClient(data.client)
    }
  }

  initialize(data) {
    this.client = data.client;
    this.connectedClients = data.connectedClients;
    this.emitChange({ type: "init", client: data.client, connectedClients: data.connectedClients });
  }

  addClient(client) {
    this.connectedClients.push(client);
    this.emitChange({ type: "join", client: client, connectedClients: this.connectedClients });
  }

  removeClient(client) {
    this.connectedClients = this.connectedClients.filter((c) => c.id !== client.id);
    this.emitChange({ type: "leave", client: client, connectedClients: this.connectedClients });
  }

  onChange(handler) {
    this.onChange = handler;
  }

  emitChange(data) {
    this.onChange(data);
  }

  bindEvents() {
    this.ws.onopen = (event) => {
      if (this.onOpen) {
        this.onOpen(event);
      }
    };

    this.ws.onmessage = (event) => {
      if (this.onMessage) {
        this.onMessage(event);
      }
    };

    this.ws.onclose = (event) => {
      if (this.onClose) {
        this.onClose(event);
      }
    };

    this.ws.onerror = (event) => {
      if (this.onError) {
        this.onError(event);
      }
    };
  }
}
