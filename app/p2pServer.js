const webSocket = require("ws");

const peers = process.env.peers ? process.env.peers.split(",") : [];
const P2P_PORT = process.env.P2P_PORT || 5001;

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new webSocket.Server({ port: P2P_PORT });
    server.on("connection", (socket) => this.connectSocket(socket));
    this.connectToPeers();
    console.log("Listening for peer to peer connections on port " + P2P_PORT);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new webSocket(peer);
      socket.on("open", () => this.connectSocket(socket));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("[+] Socket connected");
  }
}

module.exports = P2pServer;
