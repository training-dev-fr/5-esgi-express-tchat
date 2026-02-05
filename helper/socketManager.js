const { Server } = require("socket.io");

let io = null;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connecté :" + socket.id);
    })
}

function getIO() {
    if(!io){
        throw new Error("Socket.io not initialized")
    }
    return io;
}

module.exports = {getIO, initSocket};