// Cortana
var socket = require('socket.io-client')
    .connect('http://CommandRobot.azurewebsites.net');

console.log("requesting to be target");
socket.emit('setTarget');
socket.on('command', function (cmd) {
    console.log("Received command: " + cmd);
});