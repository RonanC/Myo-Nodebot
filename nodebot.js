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
    console.log("Control the bot with the Arrow keys, the space bar to stop, B to boogie, V to voice, Q to exit.");
    buzz();

    process.stdin.on("keypress", function(ch, key) {
        if (!key) {
            return;
        }
        process.stdout.write(": ");

        if (key.name == "q") {
            console.log("Quitting");
            process.exit();
        } else if (key.name == "up") {
            console.log("Forward");
            forward();
        } else if (key.name == "down") {
            console.log("Backward");
            backward();
        } else if (key.name == "left") {
            console.log("Left");
            left();
        } else if (key.name == "right") {
            console.log("Right");
            right();
        } else if (key.name == "space") {
            console.log("Stopping");
            stop();
        } else if (key.name == "b") {
            console.log("Boogie");
            boogie();
        } else if (key.name == "v") {
            console.log("Voice");
            buzz();
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
            console.log("Forward");
            forward();
        } else if (cmd == "backward") {
            console.log("Backward");
            backward();
        } else if (cmd == "left") {
            console.log("Left");
            left();
        } else if (cmd == "right") {
            console.log("Right");
            right();
        } else if (cmd == "stop") {
            console.log("Stopping");
            stop();
        } else if (cmd == "dance") {
            console.log("Dancing");
            boogie();
        } else if (cmd == "speak") {
            console.log("Speaking");
            buzz();
        }
    });
};

myoSetup = function() {
    // start talks to myo connect
    Myo.connect('ie.gmit.myoBasics');
};

// // Robot Functions
left = function() {
    left_wheel.cw();
    right_wheel.cw();
};

right = function() {
    left_wheel.ccw();
    right_wheel.ccw();
};

forward = function() {
    left_wheel.ccw();
    right_wheel.cw();
};

backward = function() {
    left_wheel.cw();
    right_wheel.ccw();
};

stop = function() {
    left_wheel.stop();
    right_wheel.stop();
    // left_wheel.to(90);
    // right_wheel.to(90);
};

boogie = function() {
    temporal.queue([{
        delay: 500,
        task: function() {
            buzz();
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
            buzz();
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
            buzz();
        }
    }]);
};

buzz = function() {
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
        buzz();
    });

    Myo.on('double_tap_off', function() {
        console.log('Event: double_tap_off');
        // console.log();
    });


    // // ADMIN
    var policyType = 'none'; // standard
    Myo.setLockingPolicy(policyType);
}
