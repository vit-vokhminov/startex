const WebSocket = require("ws");
const port = 3001;
const server = new WebSocket.Server({port});
const fs = require("fs");

server.on("connection", ws => {
    ws.on("message", message => {

        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
                fs.writeFileSync("cargo.txt", message);
            }
        });

    });

});
