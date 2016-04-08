var five = require("johnny-five");
var temporal = require("temporal");
var keypress = require("keypress");
keypress(process.stdin);

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);

var left_wheel;
var right_wheel;
var piezo;

board.on("ready", function() {
    // servo
    left_wheel = new five.Servo.Continuous(9);
    right_wheel = new five.Servo.Continuous(8);

    piezo = new five.Piezo(3);

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

});

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
