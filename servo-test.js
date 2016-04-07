var five = require("johnny-five");
var temporal = require("temporal");

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);

board.on("ready", function(){
  
  var left_wheel = new five.Servo.Continuous(9);
  var right_wheel = new five.Servo.Continuous(8);

  temporal.queue([
    {
      delay: 1000,
      task: function(){
        console.log("going forward");
        left_wheel.ccw();
        right_wheel.cw();
      }
    }, 
    {
      delay: 2000,
      task: function(){
        console.log("stopping");
        left_wheel.stop();
        right_wheel.stop();
      }
    }, 
    {
      delay:1000,
      task: function(){
        console.log("going backward");
        left_wheel.cw();
        right_wheel.ccw();
      }
    }, 
    {
      delay: 2000,
      task: function(){
        console.log("stopping");
        left_wheel.stop();
        right_wheel.stop();
      }
    }, 
    {
      delay: 1500,
      task: function(){
        console.log("Test complete. Exiting.");
        process.exit();
      }
    }, 
  ]);
});
