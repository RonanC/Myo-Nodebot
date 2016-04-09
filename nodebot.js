var five = require("johnny-five");
var temporal = require("temporal");
var keypress = require("keypress");
var Myo = require('myo');
var Sock = require('socket.io-client');

// global: Myo
// specific: myo

// // JOHNNY-FIVE
// global stuff
keypress(process.stdin);

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);

var left_wheel;
var right_wheel;
var piezo;

var myMyo;
var socket;

board.on("ready", function() {
    // servo
    left_wheel = new five.Servo.Continuous(9);
    right_wheel = new five.Servo.Continuous(8);

    piezo = new five.Piezo(3);

    keyboardSetup();

    cortanaSetup();

    myoSetup();
});

keyboardSetup = function() {
    console.log("Control the bot with the Arrow keys, the space bar to stop, D to dance, S to speak, Q to exit.");
    speak();

    process.stdin.on("keypress", function(ch, key) {
        if (!key) {
            return;
        }
        process.stdout.write(": ");

        if (key.name == "q") {
            console.log("Quitting");
            process.exit();
        } else if (key.name == "up") {
            forward();
        } else if (key.name == "down") {
            backward();
        } else if (key.name == "left") {
            left();
        } else if (key.name == "right") {
            right();
        } else if (key.name == "space") {
            stop();
        } else if (key.name == "d") {
            dance();
        } else if (key.name == "s") {
            speak();
        } else {
            console.log("Command undefined.");
        }
    });

    // Configure stdin for the keyboard controller
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
};

cortanaSetup = function() {
    socket = Sock.connect('http://CommandRobot.azurewebsites.net');
    console.log("requesting to be target");
    socket.emit('setTarget');

    socket.on('command', function(cmd) {
        console.log("Received command: " + cmd);

        if (cmd == "forward") {
            command(forward, 1500);
        } else if (cmd == "backward") {
            command(backward, 1500);
        } else if (cmd == "left") {
            command(left, 1500);
        } else if (cmd == "right") {
            command(right, 1500);
        } else if (cmd == "stop") {
            command(stop, 1500);
        } else if (cmd == "dance") {
            command(dance, 1500);
        } else if (cmd == "speak") {
            command(speak, 1500);
        }
    });
};

command = function(command, dur) {
    temporal.queue([{
        delay: 100,
        task: function() {
            speak();
            command();
        }
    }, { // stop
        delay: dur,
        task: function() {
            stop();
        }
    }]);
};

myoSetup = function() {
    // start talks to myo connect
    Myo.connect('ie.gmit.myoBasics');
};

// // Robot Functions
left = function() {
    console.log("Left");
    left_wheel.cw();
    right_wheel.cw();
};

right = function() {
    console.log("Right");
    left_wheel.ccw();
    right_wheel.ccw();
};

forward = function() {
    console.log("Forwards");
    left_wheel.ccw();
    right_wheel.cw();
};

backward = function() {
    console.log("Backwards");
    left_wheel.cw();
    right_wheel.ccw();
};

stop = function() {
    console.log("Stopping");
    left_wheel.stop();
    right_wheel.stop();
    // left_wheel.to(90);
    // right_wheel.to(90);
};

dance = function() {
    console.log("Dancing");
    temporal.queue([{
        delay: 500,
        task: function() {
            speak();
            left();
        }
    }, { // shuffle
        delay: 500,
        task: function() {
            right();
        }
    }, {
        delay: 500,
        task: function() {
            left();
        }
    }, {
        delay: 500,
        task: function() {
            right();
        }
    }, {
        delay: 500,
        task: function() {
            speak();
            forward();
        }
    }, {
        delay: 500,
        task: function() {
            backward();
        }
    }, {
        delay: 500,
        task: function() {
            left();
        }
    }, {
        delay: 500,
        task: function() {
            right();
        },
    }, { // stop
        delay: 500,
        task: function() {
            stop();
            speak();
        }
    }]);
};

speak = function() {
    piezo.play({
        // song is composed by an array of pairs of notes and beats
        // The first argument is the note (null means "no note")
        // The second argument is the length of time (beat) of the note (or non-note)
        song: "A",
        // song: "A"
        // beats: 1 / 1,
        // tempo: 50
    });
};

// // MYO
// // VARIABLE definitions
// Myo.methods.initMyo = initMyo;
// Myo.methods.helloWorld = helloWorld;
// Myo.methods.testEvents = testEvents;
// Myo.methods.testData = testData;
// Myo.methods.addEvents = addEvents;

// // Init Events
// once app is connected to myo connect app
Myo.on('connected', function(data, timestamp) {
    // console.log('\nConnected:', Myo.myos[0]);
    console.log('Event: connected:', this.name);

    // Myo.methods.initMyo();
    myMyo = this;
    addEvents(myMyo);

    // console.log('\ndata: ' + JSON.stringify(data));
    // console.log('\ntimestamp: ' + JSON.stringify(timestamp));

    console.log();
});

Myo.on('disconnected', function() {
    console.log('Event: disconnected:', this.name);
    console.log();
});

// // FUNCTION expressions
Myo.onError = function() {
    console.log("Woah, couldn't connect to Myo Connect");
};

// ONLY THIS REGISTERED ARMBAND
function addEvents(myo) {
    // arm_synced
    myo.on('arm_synced', function() {
        console.log('Event: arm_synced');
        console.log('myo.arm:', myo.arm);
        console.log('myo.direction:', myo.direction);
        console.log();
    });

    // arm_unsynced
    myo.on('arm_unsynced', function() {
        console.log('Event: arm_unsynced');
        console.log('myo.arm:', myo.arm);
        console.log('myo.direction:', myo.direction);
        console.log();
    });


    // stop
    myo.on('rest', function() {
        console.log('resting');
        stop();
    });

    // backward
    Myo.on('fist', function() {
        console.log('Event: fist');
        this.vibrate();
        backward();
    });

    Myo.on('fist_off', function() {
        console.log('Event: fist_off');
        stop();
    });


    // forward
    Myo.on('fingers_spread', function() {
        console.log('Event: fingers_spread');
        this.vibrate();
        forward();
    });

    Myo.on('fingers_spread_off', function() {
        console.log('Event: fingers_spread_off');
        stop();
    });

    // wave in
    Myo.on('wave_in', function() {
        console.log('Event: wave_in');
        this.vibrate();
        left();
    });

    Myo.on('wave_in_off', function() {
        console.log('Event: wave_in_off');
        stop();
    });

    // wave out
    Myo.on('wave_out', function() {
        console.log('Event: wave_out');
        this.vibrate();
        right();
    });

    Myo.on('wave_out_off', function() {
        console.log('Event: wave_out_off');
        stop();
    });

    // double tap
    Myo.on('double_tap', function() {
        console.log('Event: double_tap');
        this.vibrate();
        speak();
    });

    Myo.on('double_tap_off', function() {
        console.log('Event: double_tap_off');
        // console.log();
    });


    // // ADMIN
    var policyType = 'none'; // standard
    Myo.setLockingPolicy(policyType);
}
