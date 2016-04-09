var temporal = require("temporal");
var Sock = require('socket.io-client');
var socket;

cortanaSetup = function() {
    socket = Sock.connect('http://CommandRobot.azurewebsites.net');
    console.log("requesting to be target");
    socket.emit('setTarget');

    socket.on('command', function(cmd) {
        console.log("Received command: " + cmd);

        if (cmd == "left") {
            command(left, 1500);
        } else if (cmd == "left") {
            command(right, 1500);
        } else {
            console.log("Command undefined.");
        }

    });
};

command = function(command, dur) {
    temporal.queue([{
        delay: 100,
        task: function() {
            command();
        }
    }, { // stop
        delay: dur,
        task: function() {
            console.log("Command finished.");
        }
    }]);
};

// // Robot Functions
left = function() {
    console.log("Left");
};

right = function() {
    console.log("Right");
};

cortanaSetup();
